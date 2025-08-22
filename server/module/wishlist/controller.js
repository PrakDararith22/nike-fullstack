import jwt from "jsonwebtoken";
import { getWishlistService, addWishlistService, deleteWishlistItemService } from "./service.js";

export async function getWishlistController(req, res) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new Error("Access deniel");
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;
    const cartData = await getWishlistService(userId);
    res.status(200).json(cartData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function addWishlistItemController(req, res) {
  try {
    const { product_id, user_id } = req.body;

    const cartData = await addWishlistService(product_id, user_id);
    res.status(200).json({ message: cartData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteWishlistItemController(req, res) {
  try {
    const itemId = req.params.id;
    const cartData = await deleteWishlistItemService(itemId);
    res.status(200).json({ message: cartData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
