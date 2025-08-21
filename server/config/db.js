import { Pool } from "pg";

const pool = new Pool();

// // Handle pool errors
// pool.on("error", err => {
//   console.error("Unexpected error on idle client", err);
//   process.exit(-1);
// });

// // Optional: Test connection on startup
// pool.query("SELECT NOW()", (err, result) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//   } else {
//     console.log("Database connected successfully at:", result.rows[0].now);
//   }
// });

export default pool;
