import { getWishlistModel, addWishlistItemModel, deleteWishlistItemModel } from "./model.js";

export async function getWishlistService(userId) {
  if (!userId) throw new Error("User ID is required");
  if (typeof userId !== "string") throw new Error("Invalid ID");
  const cartInfo = await getWishlistModel(userId);
  return cartInfo;
}

export async function addWishlistService(product_id, user_id) {
  if (!product_id) throw new Error("Product ID is Required");
  if (!user_id) throw new Error("User ID is Required");
  await addWishlistItemModel(product_id, user_id);
  return "Successfully Added item";
}

export async function deleteWishlistItemService(item_id) {
  if (!item_id) throw new Error("Item ID is Required");
  await deleteWishlistItemModel(item_id);
  return "Successfully Deleted";
}
