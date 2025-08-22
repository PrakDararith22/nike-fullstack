import pool from "../../config/db.js";

// problem : the cart item need to be unique base on product id and size
// consider: return feature of product(have not done)
export async function getCartModel(userId) {
  const cartInfo = await pool.query(
    `SELECT c.id, p.id AS product_id, p.name, c.size, c.quantity, c.add_at, p.brand_id, p.gender_id, p.category_id, p.description
    FROM user_cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = $1`,
    [userId]
  );
  return cartInfo;
}

export async function addCartItemModel(product_id, size, quantity, user_id) {
  await pool.query(
    `
    INSERT INTO user_cart (product_id, size, quantity, user_id)
VALUES($1, $2, $3, $4);
    `,
    [product_id, size, quantity, user_id]
  );
}

export async function updateCartItemModel(query, values) {
  await pool.query(query, values);
}
export async function deleteCartItemModel(item_id) {
  await pool.query(
    `
    DELETE FROM user_cart 
    WHERE id = $1;
        `,
    [item_id]
  );
}
