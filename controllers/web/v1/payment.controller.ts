import { Request, Response } from "express";
import { User } from "../../../src/entity/User";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { errRes, getOtp, okRes } from "../../../utility/util.service";
import PhoneFormat from "../../../utility/phoneFormat.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../../config";

export default class PayController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async checkout(req: Request, res: Response): Promise<object> {

    // validate the body
    /** TOKEN -> user req.user
     * product id
     * quantity
     * way
     * gov
     * city
     * address
     */

    // check if id exist & qantity avalible  -> if not error

    // calculate the total 

    // create an order (pending)

    // create the order item

    // generate the link for payment method TODO:

    // return the details 

    return okRes(res, {});
  }
}
