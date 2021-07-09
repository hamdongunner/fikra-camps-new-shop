require("dotenv").config();

export default {
  jwtUserSecret: process.env.JWT_USER_SECRET || "shhh",
  jwtPasswordSecret: process.env.JWT_PASSWORD_SECRET || "sdjnjfnv",
};
