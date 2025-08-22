import express from "express";
import {
  getWishlistController,
  addWishlistItemController,
  deleteWishlistItemController,
} from "./controller.js";
import { addWishlistItemValidation } from "../../middleware/wishlist-validation.js";

const wishlistRouter = express.Router();

wishlistRouter
  .route("/wishlist")
  .get(getWishlistController)
  .post(addWishlistItemValidation, addWishlistItemController);
wishlistRouter.route("/wishlist/:id").delete(deleteWishlistItemController);

export default wishlistRouter;
