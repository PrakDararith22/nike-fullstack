/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = pgm => {
  pgm.dropColumn("products", "price");
  pgm.dropColumn("products", "total_quantity");
  pgm.addColumns("product_size", {
    price: {
      type: "decimal(8,2)",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = pgm => {
  pgm.addColumn("price", {
    modified_at: { type: "timestamp", default: pgm.func("now()") },
    modified_by: { type: "uuid" },
  });
};
