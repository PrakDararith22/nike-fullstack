import express from "express";
import {
  getProductsByIdController,
  getProductsController,
  addProductController,
  addGenderController,
  addCategoriesController,
  addBrandController,
} from "./controller.js";
import {
  addProductValidation,
  addGenderValidation,
  addCategoryValidation,
  addBrandValidation,
} from "../../middleware/product-validation.js";

const productRouter = express.Router();

// todo test all of the route include sort filter and id
// todo changhe the validation again and using express validation
productRouter
  .route("/products")
  .get(getProductsController)
  .post(addProductValidation, addProductController);
productRouter.get("/products/:id", getProductsByIdController);
productRouter.post("/product/gender", addGenderValidation, addGenderController);
productRouter.post("/product/categories", addCategoryValidation, addCategoriesController);
productRouter.post("/product/brand", addBrandValidation, addBrandController);
export default productRouter;
