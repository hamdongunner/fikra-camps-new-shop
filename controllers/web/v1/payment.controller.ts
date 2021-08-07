import { Request, Response } from "express";
import { User } from "../../../src/entity/User";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { errRes, getOtp, okRes } from "../../../utility/util.service";
import PhoneFormat from "../../../utility/phoneFormat.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../../config";
import { Product } from "../../../src/entity/Product";
import { Order } from "../../../src/entity/Order";
import { OrderItem } from "../../../src/entity/OrderItem";
import * as ZC from "zaincash";

export default class PayController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async checkout(req, res): Promise<object> {
    let lang = req.query.lang;
    // validate the body

    const body = req.body;
    // validate the req
    let notValid = validate(body, Validator.checkout());
    if (notValid) return errRes(res, notValid);

    if (body.cart.length < 1) return errRes(res, "emptyCart", 400, lang);

    let total = 0;
    let items = [];
    for (const item of body.cart) {
      let notValid = validate(item, Validator.checkoutItem());
      if (notValid) return errRes(res, notValid);

      // get the product from the db
      // check if id exist & qantity avalible  -> if not error
      let product = await Product.findOne(item.id);
      if (!product) return errRes(res, `product ${item.id} not found`, 404);
      if (product.quantity < item.quantity)
        return errRes(res, `product ${item.id} out of stock`);
      // calculate the total
      total = total + product.price * item.quantity;
      items.push({ ...product, q: item.quantity });
    }

    // create an order (pending)
    let order = await Order.create({
      user: req.user.id,
      total,
      totalAfterDiscount: total,
      paymentMethod: body.way,
      address: body.address,
      gov: body.gov,
      city: body.city,
    });

    await order.save();

    // create the order item
    for (const item of items) {
      let orderItem = await OrderItem.create({
        order,
        product: item.id,
        price: item.price,
        quantity: item.q,
        total: item.price * item.q,
      });

      await orderItem.save();
    }

    let paymentFunction = paymentMethods[body.way];

    // generate the link for payment method TODO:
    let paymetnResult = paymentFunction(order);

    return okRes(res, paymetnResult);
  }
}

let zcFunction = async (order) => {
  const paymentData = {
    amount: order.total,
    orderId: order.id,
    serviceType: "Fikra Shop",
    redirectUrl: "http:localhost:3000/zc/redirect",
    production: false,
    msisdn: "9647835077893",
    merchantId: "5ffacf6612b5777c6d44266f",
    secret: "$2y$10$hBbAZo2GfSSvyqAyV2SaqOfYewgYpfR1O19gIh4SqyGWdmySZYPuS",
    lang: "ar",
  };

  // init a zc tr
  let zc = new ZC(paymentData);

  try {
    let transationcId = await zc.init();

    let url = `https://test.zaincash.iq/transaction/pay?id=${transationcId}`;
    // return the details
    return { order, url };
  } catch (error) {
    return { errMsg: "Something wrong" };
  }
};

let paymentMethods = {
  zc: zcFunction,
  // ah: ahFunction,
  // qi: qiFunction,
};
