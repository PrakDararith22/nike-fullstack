import pool from "../../config/db.js";

export async function getUserByNameModel(username) {
  const result = await pool.query("SELECT id, username, password FROM users WHERE username = $1", [
    username,
  ]);
  if (result.rowCount === 0) return null;
  return result.rows[0];
}
export async function addUserModel({ username, email, password }) {
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return result.rows[0];
}

export async function getUserModel(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (result.rowCount === 0) return null;

  return result.rows[0];
}

export async function deleteUserModel(id) {
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
  if (result.rows.length === 0) return null;

  return result.rows[0];
}
