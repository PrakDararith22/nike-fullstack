import pool from "../../config/db.js";

export async function queryProductsModel(query, values) {
  return (await pool.query(query, values)).rows;
}

export async function queryProductByIdModel(id) {
  return pool.query(
    `
    SELECT 
    p.id, 
    p.name, 
    b.name AS brand_name, 
    g.gender AS gender, 
    c.category AS category_name,
    p.description, 
    -- Aggregate features as JSON array
    COALESCE(
        JSON_AGG(DISTINCT f.feature) FILTER (WHERE f.feature IS NOT NULL),
        '[]'
    ) AS features,
    -- Aggregate sizes as JSON array of objects
    COALESCE(
        JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('size', s.size, 'quantity', s.quantity)) 
        FILTER (WHERE s.id IS NOT NULL),
        '[]'
    ) AS sizes
    FROM products p
    JOIN brand b ON p.brand_id = b.id
    JOIN gender g ON p.gender_id = g.id
    JOIN category c ON p.category_id = c.id
    LEFT JOIN product_feature f ON f.product_id = p.id
    LEFT JOIN product_size s ON s.product_id = p.id
    WHERE p.id = $1 
    GROUP BY p.id, p.name, b.name, g.gender, c.category, p.description
    
  `,
    [id]
  );
}

export async function addProductsModel(
  client,
  { name, gender, brand, category, description, createdBy }
) {
  const result = await client.query(
    `
    INSERT INTO products(name, gender_id, brand_id, category_id, description, created_by)
    SELECT
      $1,    
      g.id,  
      b.id,  
      c.id,  
      $5,    
      $6     
    FROM gender g, brand b, category c
    WHERE g.gender = $2 AND b.name = $3 AND c.category = $4 
    LIMIT 1
    RETURNING id`,
    [name, gender, brand, category, description, createdBy]
  );

  return result.rows[0].id;
}

export async function addProductFeatureModel(client, query1, values) {
  await client.query(query1, values);
}

export async function addProductSizeModel(client, query, values) {
  await client.query(query, values);
}

export async function addCategoriesModel(category, createdBy) {
  await pool.query("INSERT INTO category (category,created_by) VALUES($1,$2)", [
    category,
    createdBy,
  ]);
}
export async function addGenderModel(gender, createdBy) {
  await pool.query("INSERT INTO category (gender,created_by) VALUES($1,$2)", [gender, createdBy]);
}
export async function addBrandModel(brand, createdBy) {
  await pool.query("INSERT INTO category (brand,created_by) VALUES($1,$2)", [brand, createdBy]);
}
