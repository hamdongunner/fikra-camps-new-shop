import { Category } from "../../../src/entity/Category";
import { User } from "../../../src/entity/User";
import { okRes, paginate } from "../../../utility/util.service";

/**
 *
 */
export default class HomeController {
  static async getCategories(req, res) {
    let data, users;
    let { s, p } = req.query;
    //  data = await Category.find({ relations: ["subcategories"] });
    let { take, skip } = paginate(p, s);

    data = Category.findAndCount({
      where: { active: true },
      join: {
        alias: "category",
        leftJoinAndSelect: {
          subcategories: "category.subcategories",
          products: "subcategories.products",
        },
      },
    });

    users = User.findAndCount({
      where: { active: true },
      take,
      skip,
    });

    [data, users] = await Promise.all([data, users]);

    return okRes(res, { data, users });
  }
}
