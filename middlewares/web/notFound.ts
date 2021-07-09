import { errRes } from "../../utility/util.service";

export default (req, res, next) => {
  return errRes(res, `Not Found`, 404);
};
