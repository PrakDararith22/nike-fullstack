import pool from "../../config/db.js";
import {
  queryProductsModel,
  queryProductByIdModel,
  addProductsModel,
  addProductFeatureModel,
  addProductSizeModel,
  addCategoriesModel,
  addBrandModel,
} from "./model.js";

export async function getProductsService({ filter = {}, sort = {} }) {
  let query = `
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
          JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('size', s.size, 'quantity', s.quantity, 'price', s.price)) 
          FILTER (WHERE s.id IS NOT NULL),
          '[]'
      ) AS sizes,
      MIN(s.price) as min_price,
      MAX(s.price) as max_price,
      COALESCE(SUM(s.quantity), 0) as total_quantity
    FROM products p
    JOIN brand b ON p.brand_id = b.id
    JOIN gender g ON p.gender_id = g.id
    JOIN category c ON p.category_id = c.id
    LEFT JOIN product_feature f ON f.product_id = p.id
    LEFT JOIN product_size s ON s.product_id = p.id
  `;

  const whereConditions = [];
  const havingConditions = [];
  const values = [];

  // Row-level filters (WHERE)
  const { category, brand, gender, search } = filter;
  if (category) {
    values.push(category);
    whereConditions.push(`c.category = $${values.length}`);
  }
  if (brand) {
    values.push(brand);
    whereConditions.push(`b.name = $${values.length}`);
  }
  if (gender) {
    values.push(gender);
    whereConditions.push(`g.gender = $${values.length}`);
  }
  if (search) {
    values.push(`%${search}%`);
    whereConditions.push(
      `(p.name ILIKE $${values.length} OR p.description ILIKE $${values.length})`
    );
  }

  // Aggregate-level filters (HAVING)
  const { minPrice, maxPrice, inStock } = filter;
  if (minPrice !== undefined) {
    values.push(Number(minPrice));
    havingConditions.push(`MIN(s.price) >= $${values.length}`);
  }
  if (maxPrice !== undefined) {
    values.push(Number(maxPrice));
    havingConditions.push(`MIN(s.price) <= $${values.length}`);
  }
  if (inStock) {
    havingConditions.push("COALESCE(SUM(s.quantity), 0) > 0");
  }

  // Append WHERE clause
  if (whereConditions.length) {
    query += ` WHERE ${whereConditions.join(" AND ")}`;
  }

  query += `
    GROUP BY p.id, p.name, b.name, g.gender, c.category, p.description
  `;

  // Append HAVING clause
  if (havingConditions.length) {
    query += ` HAVING ${havingConditions.join(" AND ")}`;
  }

  // Sort
  const { fields = ["min_price"], directions = ["asc"] } = sort;
  const allowedSort = ["min_price", "max_price", "name", "created_at", "total_quantity"];
  const orderClauses = [];

  fields.forEach((field, index) => {
    if (allowedSort.includes(field)) {
      const direction = (directions[index] || directions[0] || "asc").toUpperCase();
      // map price fields to aggregated aliases
      const column = field === "price" ? "min_price" : field;
      orderClauses.push(`${column} ${direction}`);
    }
  });

  if (orderClauses.length) {
    query += ` ORDER BY ${orderClauses.join(", ")}`;
  }

  return queryProductsModel(query, values);
}

export async function getproductsByIdService(id) {
  if (!id) throw new Error("ID Required");
  if (Number.isNaN(id)) throw new Error("ID must be number");
  const result = await queryProductByIdModel(id);
  return result;
}

export async function addProductFeature(client, productId, features = []) {
  // validation
  if (productId === null || productId === undefined) throw new Error("Product ID is required");
  if (typeof productId !== "number") throw new Error("Product ID must be a number");
  if (features === null || features === undefined) throw new Error("features is required");
  if (!Array.isArray(features)) throw new Error("features must be an array");
  if (features.length === 0) throw new Error("features cannot be empty");

  const values = [];
  const placeholders = features.map((feature, index) => {
    values.push(productId, feature);
    const idx = index * 2;
    return `($${idx + 1}, $${idx + 2})`;
  });

  const query = `
    INSERT INTO product_feature(product_id, feature)
    VALUES ${placeholders.join(", ")}

  `;
  await addProductFeatureModel(client, query, values);
}

export async function addProductSize(client, productId, sizes = []) {
  // validation
  if (productId === null || productId === undefined) throw new Error("Product ID is required");
  if (typeof productId !== "number") throw new Error("Product ID must be a number");
  if (sizes === null || sizes === undefined) throw new Error("Sizes is required");
  if (!Array.isArray(sizes)) throw new Error("Sizes must be an array");
  if (sizes.length === 0) throw new Error("Sizes cannot be empty");

  const values = [];
  const placeholders = sizes.map((item, index) => {
    values.push(productId, item.size, item.quantity, item.price);

    const idx = index * 4;
    return `($${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4})`;
  }); // placeholder is generate string like ['($1, $2)', '($3, $4)'] to plug in pool.query

  const query = `
  INSERT INTO product_size(product_id, size, quantity, price)
  VALUES ${placeholders.join(", ")}
  `;

  await addProductSizeModel(client, query, values);
}

export async function addProductService(detail) {
  // validation
  if (typeof detail !== "object") throw new Error("detail must be object");
  const client = await pool.connect(); // connect to one of connection(client) store it in variable client until transaction end make sure all of operation is done in one connection
  try {
    await client.query("BEGIN");
    const { name, gender, brand, category, description, feature, sizes, createdBy } = detail;

    const id = await addProductsModel(client, {
      name,
      gender,
      brand,
      category,
      description,
      createdBy,
    });

    await addProductFeature(client, id, feature);
    await addProductSize(client, id, sizes);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error(`Transaction Failed ${error.message}`);
  } finally {
    client.release();
  }
}

export async function addGenderService(gender) {
  // validation
  if (gender === null || gender === undefined) throw new Error("gender is required");
  if (typeof gender !== "string") throw new Error("Gender must be string");
  await addGenderService(gender);
}

export async function addCategoriesService(category) {
  // validation
  if (category === null || category === undefined) throw new Error("category is required");
  if (typeof category !== "string") throw new Error("category must be string");

  await addCategoriesModel(category);
}

export async function addBrandService(brand) {
  // validation
  if (brand === null || brand === undefined) throw new Error("brand is required");
  if (typeof brand !== "string") throw new Error("brand must be string");

  await addBrandModel(brand);
}
// delete

// update

// partial update
