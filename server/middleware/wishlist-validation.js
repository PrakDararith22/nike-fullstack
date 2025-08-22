import { body } from "express-validator";

export const addWishlistItemValidation = [
  body("product_id").notEmpty().withMessage("Product ID Required"),
  body("user_id").notEmpty().withMessage("User ID Required"),
];
