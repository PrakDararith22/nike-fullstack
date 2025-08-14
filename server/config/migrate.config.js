// migrate.config.js
export default {
  database: {
    host: "localhost",
    port: process.env.PGPORT,
    database: "nike",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  },
  migrationsTable: "pgmigrations",
  dir: "migrations", // the migation file directory
};
