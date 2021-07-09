import { Request, Response } from "express";
import { User } from "../../../src/entity/User";

export default class UserController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const users = await User.find({ where: { active: true } });

    return res.json(users);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async add(req: Request, res: Response): Promise<object> {
    let user;
    try {
      user = await User.create({
        name: "alwi",
        phone: "0w78",
        password: "123w45",
        isVerified: true,
        otp: 1224,
        isBuyer: true,
        birthDate: "2021/01/01",
        active: true,
      });

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
