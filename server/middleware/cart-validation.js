import { body } from "express-validator";

export const addCartItemValidation = [
  body("product_id").notEmpty().withMessage("Product ID Required"),
  body("size").notEmpty().withMessage("size ID Required"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity  Required")
    .bail()
    .isNumeric()
    .withMessage("Quantity Must Be Number"),
  body("product_id").notEmpty().withMessage("Product ID Required"),
];
