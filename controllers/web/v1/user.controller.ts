import { Request, Response } from "express";
import { User } from "../../../src/entity/User";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { errRes, getOtp, okRes } from "../../../utility/util.service";
import PhoneFormat from "../../../utility/phoneFormat.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../../config";

export default class UserController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async register(req: Request, res: Response): Promise<object> {
    // get the body
    const body = req.body;
    // validate the req
    let notValid = validate(body, Validator.register());
    if (notValid) return errRes(res, notValid);

    // format to the number
    let phoneObj = PhoneFormat.getAllFormats(body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${body.phone} is not valid`);

    body.phone = phoneObj.globalP;
    let phone = phoneObj.globalP;

    // hash the password
    let salt = await bcrypt.genSalt(12);
    let password = await bcrypt.hash(body.password, salt);
    // create otp
    let otp = getOtp();
    body.password = password;
    body.otp = otp;

    // check if the user already exists
    let user;
    user = await User.findOne({ where: { phone } });
    // if exists but not verified
    if (user) {
      if (!user.isVerified) {
        Object.keys(body).forEach((key) => {
          user[key] = body[key];
        });
      } else return errRes(res, `User ${phone} is already exist`);
    } else {
      user = await User.create({
        name: body.name,
        phone: body.phone,
        password: body.password,
        birthDate: body.birthDate,
        otp: body.otp,
      });
    }

    // save the user
    await user.save();

    // send sms

    let token = jwt.sign({ id: user.id }, CONFIG.jwtUserSecret);

    // return res
    return okRes(res, { token });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async checkOtp(req, res): Promise<object> {
    // get the otp from body
    let body = req.body;
    let otp = body.otp;
    if (!otp) return errRes(res, `Otp is required`);
    // check if they are the same DB
    let user = req.user;

    // if not -> delete the otp from DB + ask user to try again
    if (user.otp != otp) {
      user.otp = null;
      await user.save();
      return errRes(res, "otp is incorrect");
    }
    // if yes -> isVerified = true
    user.isVerified = true;
    await user.save();
    // return res
    return okRes(res, { user });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async login(req, res): Promise<object> {
    // get body
    let body = req.body;
    // verify body
    let notValid = validate(body, Validator.login());
    if (notValid) return errRes(res, notValid);

    // format to the number
    let phoneObj = PhoneFormat.getAllFormats(body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${body.phone} is not valid`);

    let phone = phoneObj.globalP;
    let password = body.password;
    // get user from db by phone + isVerified
    let user = await User.findOne({ where: { phone, isVerified: true } });
    if (!user) return errRes(res, `Please complete the registration process`);

    // compaire the password
    let check = await bcrypt.compare(password, user.password);
    if (!check) return errRes(res, "Incorrect credentials");

    // token
    let token = jwt.sign({ id: user.id }, CONFIG.jwtUserSecret);

    // return token
    return okRes(res, { token, user });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async check(req, res) {
    return okRes(res, { msg: "you are logged in" });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async forget(req, res) {
    // get the body
    // validate
    let body = req.body;

    let notValid = validate(body, Validator.forget());
    if (notValid) return errRes(res, notValid);

    // format phone
    let phoneObj = PhoneFormat.getAllFormats(body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${body.phone} is not valid`);

    let phone = phoneObj.globalP;

    // get user from db using phone + isVerified
    let user = await User.findOne({
      where: { phone, isVerified: true, active: true },
    });
    if (!user) return errRes(res, `Please complete the registration process`);

    // create passwordOtp & save
    let passwordOtp = getOtp();

    user.passwordOtp = passwordOtp;
    await user.save();

    // send sms

    // create token
    let token = jwt.sign({ phone: user.phone }, CONFIG.jwtPasswordSecret);

    return okRes(res, { token });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async verifyPassword(req, res) {
    // validate
    let body = req.body;

    let notValid = validate(body, Validator.verifyPassword());
    if (notValid) return errRes(res, notValid);

    // get the token
    let token = req.headers.token;
    let phone;
    // get the user from db using id
    try {
      let payload;
      payload = jwt.verify(token, CONFIG.jwtPasswordSecret);
      phone = payload.phone;
    } catch (error) {
      return errRes(res, "Invalid token");
    }

    let user = await User.findOne({ where: { phone } });
    if (!user) return errRes(res, "User not found");

    // compaire the passwordOtp from db & body
    if (body.passwordOtp != user.passwordOtp)
      return errRes(res, "invalid one time password");

    // hash new password
    let salt = await bcrypt.genSalt(12);
    let password = await bcrypt.hash(body.newPassword, salt);

    // save new password
    user.password = password;
    await user.save();

    // return ok res
    // let token = jwt.sign({ id: user.id }, CONFIG.jwtUserSecret);

    return okRes(res, { msg: "All good" });
  }
}
