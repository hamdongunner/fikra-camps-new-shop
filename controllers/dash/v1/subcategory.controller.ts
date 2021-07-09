import { Request, Response } from "express";
import { Category } from "../../../src/entity/Category";
import { SubCategory } from "../../../src/entity/SubCategory";
import { User } from "../../../src/entity/User";
import { errRes, okRes } from "../../../utility/util.service";

export default class SubCategoryController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data = await SubCategory.find({ where: { active: true } });

    return okRes(res, data);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async add(req: Request, res: Response): Promise<object> {
    let data;

    let id: any;
    id = req.params.id;
    // let category = await Category.findOne({ where: { id, active: true } });

    // if (!category)
    //   return errRes(res, `Category ${id} does not exist or inactive`);

    try {
      let categoryId: any;
      categoryId = 1;
      data = await SubCategory.create({
        name: "name4",
        nameAr: "arabic4",
        category: id,
      });

      await data.save();
    } catch (error) {
      return res.json(error);
    }
    return res.json(data);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async edit(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let user;

    try {
      user = await User.findOne(id);
      if (!user) return res.json("not found");
      user.name = "edited";
      await user.save();
    } catch (error) {
      return res.json(error);
    }
    return res.json(user);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let user;

    try {
      user = await User.findOne(id);
      if (!user) return res.json("not found");
      user.active = !user.active;
      await user.save();
    } catch (error) {
      return res.json(error);
    }
    return res.json(user);
  }
}
