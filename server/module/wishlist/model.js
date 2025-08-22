import pool from "../../config/db.js";

// problem : the cart item need to be unique base on product id and size
// consider: return feature of product(have not done)
export async function getWishlistModel(userId) {
  const wishlist = await pool.query(
    `
    SELECT w.id, p.id AS product_id, p.name, w.add_at, p.brand_id, p.gender_id, p.category_id, p.description
      FROM wishlist w
      JOIN products p ON w.product_id = p.id
    WHERE w.user_id = $1;`,
    [userId]
  );
  return wishlist.rows;
}

export async function addWishlistItemModel(product_id, user_id) {
  await pool.query(
    `
   INSERT INTO wishlist(product_id, user_id)
VALUES($1, $2);
    `,
    [product_id, user_id]
  );
}

export async function deleteWishlistItemModel(item_id) {
  await pool.query(
    `
    DELETE FROM wishlist 
    WHERE id = $1;
        `,
    [item_id]
  );
}
