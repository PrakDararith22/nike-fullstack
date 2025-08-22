import {
  getCartModel,
  addCartItemModel,
  updateCartItemModel,
  deleteCartItemModel,
} from "./model.js";

export async function getCartService(userId) {
  if (!userId) throw new Error("User ID is required");
  if (typeof userId !== "string") throw new Error("Invalid ID");
  const cartInfo = await getCartModel(userId);
  return cartInfo;
}

export async function addItemService(product_id, size, quantity, user_id) {
  if (!product_id) throw new Error("ID is Required");
  if (!size) throw new Error("Size is Required");
  if (!quantity) throw new Error("Quatity is Required");
  if (typeof quantity !== "number") throw new Error("Quantity must Be number");
  if (!user_id) throw new Error("User ID is Required");
  await addCartItemModel(product_id, size, quantity, user_id);
  return "Successfully Added item";
}

export async function updateCartItemService(size, quantity, cart_id) {
  if (!cart_id) throw new Error("Cart ID is Required");
  if (!size && !quantity)
    throw new Error("Please provide either size, quantity, or both to update");

  const setClauses = [];
  const values = [];
  let count = 1;

  if (quantity) {
    setClauses.push(`quantity = $${count}`);
    values.push(quantity);
    count += 1;
  }

  if (size !== undefined && size !== null) {
    setClauses.push(`size = $${count}`);
    values.push(size);
    count += 1;
  }
  values.push(cart_id);

  const query = `UPDATE user_cart SET ${setClauses.join(", ")} WHERE id = $${count}`;
  await updateCartItemModel(query, values);
  return "Successfully updated";
}

export async function deleteCartItemService(item_id) {
  if (!item_id) throw new Error("Item ID is Required");
  await deleteCartItemModel(item_id);
  return "Successfully Deleted";
}
