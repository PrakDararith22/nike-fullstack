import jwt from "jsonwebtoken";
import {
  getCartService,
  addItemService,
  updateCartItemService,
  deleteCartItemService,
} from "./service.js";

export async function getCartController(req, res) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new Error("Access deniel");
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;
    const cartData = await getCartService(userId);
    res.status(200).json(cartData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function addCartItemController(req, res) {
  try {
    const { product_id, size, quantity, user_id } = req.body;

    const cartData = await addItemService(product_id, size, quantity, user_id);
    res.status(200).json({ message: cartData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateCartItemController(req, res) {
  try {
    const itemId = req.params.id;
    const { size, quantity } = req.body;
    const cartData = await updateCartItemService(size, quantity, itemId);
    res.status(200).json({ message: cartData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteCartItemController(req, res) {
  try {
    const itemId = req.params.id;
    const cartData = await deleteCartItemService(itemId);
    res.status(200).json({ message: cartData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
