import { Request, Response } from "express";
import { Raw } from "typeorm";
import validate = require("validate.js");
import { Category } from "../../../src/entity/Category";
import { errRes, okRes, paginate } from "../../../utility/util.service";
import Validator from "../../../utility/validation";

export default class CategoryController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req, res): Promise<object> {
    let data;
    let { s, p, q } = req.query;
    let { take, skip } = paginate(p, s);
    let whereObj;

    if (q) whereObj = { active: true, name: Raw((a) => `${a} ILIKE ${q}`) };
    else whereObj = { active: true };

    try {
      data = await Category.findAndCount({
        where: whereObj,
        take,
        skip,
      });
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, errMsg);
    }

    return okRes(res, { data });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async add(req: Request, res: Response): Promise<object> {
    const body = req.body;
    // validate the req
    let notValid = validate(body, Validator.addCategory());
    if (notValid) return errRes(res, notValid);
    // try to add

    let data;
    try {
      data = await Category.create({
        ...body,
      });

      await data.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, errMsg);
    }
    return okRes(res, { data });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async edit(req: Request, res: Response): Promise<object> {
    const body = req.body;
    // validate the req
    let notValid = validate(body, Validator.addCategory(false));
    if (notValid) return errRes(res, notValid);

    const id = req.params.id;
    let data;

    try {
      data = await Category.findOne(id);
      if (!data) return errRes(res, "Not found");

      Object.keys(data).forEach((key) => {
        if (body[key]) data[key] = body[key];
      });

      await data.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, errMsg);
    }
    return okRes(res, { data });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let data;

    try {
      data = await Category.findOne(id);
      if (!data) return errRes(res, "Not Found");
      data.active = !data.active;
      await data.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, errMsg);
    }
    return okRes(res, { data });
  }
}
