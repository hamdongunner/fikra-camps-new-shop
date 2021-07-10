import { Raw } from "typeorm";
import { Category } from "../../../src/entity/Category";
import { Product } from "../../../src/entity/Product";
import { SubCategory } from "../../../src/entity/SubCategory";
import { User } from "../../../src/entity/User";
import { errRes, okRes, paginate } from "../../../utility/util.service";

/**
 *
 */
export default class HomeController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getCategories(req, res) {
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
        // join: {
        //   alias: "category",
        //   leftJoinAndSelect: {
        //     subcategories: "category.subcategories",
        //     products: "subcategories.products",
        //   },
        // },
      });
    } catch (error) {
      return errRes(res, error);
    }

    return okRes(res, { data });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getSub(req, res) {
    let data;
    let { s, p, q } = req.query;
    let { take, skip } = paginate(p, s);
    let whereObj;
    let id = req.params.id;

    if (q)
      whereObj = {
        active: true,
        name: Raw((a) => `${a} ILIKE ${q}`),
        category: id,
      };
    else whereObj = { active: true, category: id };

    try {
      data = await SubCategory.findAndCount({
        where: whereObj,
        take,
        skip,
      });
    } catch (error) {
      return errRes(res, error);
    }

    return okRes(res, { data });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getProducts(req, res) {
    let data;
    let { s, p, q } = req.query;
    let { take, skip } = paginate(p, s);
    let whereObj;
    let id = req.params.id;

    if (q)
      whereObj = {
        active: true,
        name: Raw((a) => `${a} ILIKE ${q}`),
        category: id,
      };
    else whereObj = { active: true, subcategory: id };

    try {
      data = await Product.findAndCount({
        where: whereObj,
        take,
        skip,
      });
    } catch (error) {
      return errRes(res, error);
    }

    return okRes(res, { data });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getProduct(req, res) {
    let data;
    let id = req.params.id;

    try {
      data = await Product.findOne({
        where: { id },
      });
    } catch (error) {
      return errRes(res, error);
    }

    return okRes(res, { data });
  }
}
