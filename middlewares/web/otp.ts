import { errRes } from "../../utility/util.service";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
import { User } from "../../src/entity/User";

export default async (req, res, next) => {
  // get the token
  const token = req.headers.token;
  if (!token) return errRes(res, "You need to register");
  // verify token

  try {
    let payload: any;
    payload = jwt.verify(token, CONFIG.jwtUserSecret);
    // get user
    let user = await User.findOne(payload.id);
    // check user isVerified
    if (user.isVerified) return errRes(res, `You are already verified`);
    req.user = user;
    // next
    return next();
  } catch (error) {
    return errRes(res, error);
  }
};
