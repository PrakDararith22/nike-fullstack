import { body } from "express-validator";

// add product required
// addd all of product vidation
// createby need to change it will be automation operate by access toekn info
const requiredFields = [
  "name",
  "gender",
  "brand",
  "category",
  "description",
  "createdBy",
  "product_id",
];
export const addProductValidation = [
  ...requiredFields.map(field => body(field).notEmpty().withMessage(`${field} is required`)),
  body("features")
    .notEmpty()
    .withMessage("Feature Required")
    .bail()
    .isArray()
    .withMessage("Features Must Be arrays"),
  body("sizes")
    .notEmpty()
    .withMessage("sizes Required")
    .bail()
    .isArray()
    .withMessage("sizes Must Be arrays"),
];

export const addGenderValidation = [body("gender").notEmpty().withMessage("Gender Required")];
export const addCategoryValidation = [body("category").notEmpty().withMessage("Category Required")];
export const addBrandValidation = [body("brand").notEmpty().withMessage("Brand Required")];
