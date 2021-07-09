import * as express from "express";
import SubCategoryController from "../../controllers/dash/v1/subcategory.controller";
import UserController from "../../controllers/dash/v1/user.controller";
const route = express.Router();

// USER
route.get("/users", UserController.getAll);
route.post("/users", UserController.add);
route.put("/users/:id", UserController.edit);
route.delete("/users/:id", UserController.delete);



route.post("/subcategories/category/:id", SubCategoryController.add);



// get one

export default route;
