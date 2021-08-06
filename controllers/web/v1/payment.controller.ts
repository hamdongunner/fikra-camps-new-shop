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

export default class PayController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async checkout(req, res): Promise<object> {
    // validate the body

    const body = req.body;
    // validate the req
    let notValid = validate(body, Validator.checkout());
    if (notValid) return errRes(res, notValid);

    if (!body.cart) return errRes(res, "cart shouldn't be empty");

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

    // generate the link for payment method TODO:

    // return the details

    return okRes(res, { order });
  }
}
