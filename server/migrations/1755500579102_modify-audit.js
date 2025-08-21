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
  pgm.dropColumn("products", "modified_at");
  pgm.dropColumn("users", "modified_at");
  pgm.dropColumn("product_size", "modified_at");
  pgm.dropColumn("product_feature", "modified_at");
  pgm.dropColumn("product_discount", "modified_at");
  pgm.dropColumn("gender", ["modified_at", "modified_by"]);
  pgm.dropColumn("category", ["modified_at", "modified_by"]);
  pgm.dropColumn("brand", ["modified_at", "modified_by"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = pgm => {
  pgm.addColumn("products", {
    modified_at: { type: "timestamp", default: pgm.func("now()") },
  });
  pgm.addColumn("users", {
    modified_at: { type: "timestamp", default: pgm.func("now()") },
  });
  pgm.addColumn("product_size", {
    modified_at: { type: "timestamp", default: pgm.func("now()") },
  });
  pgm.addColumn("product_feature", {
    modified_at: { type: "timestamp", default: pgm.func("now()") },
  });
  pgm.addColumn("product_discount", {
    modified_at: { type: "timestamp", default: pgm.func("now()") },
  });
  pgm.addColumn("gender", {
    modified_at: { type: "timestamp", default: pgm.func("now()") },
    modified_by: { type: "uuid" },
  });
  pgm.addColumn("category", {
    modified_at: { type: "timestamp", default: pgm.func("now()") },
    modified_by: { type: "uuid" },
  });
  pgm.addColumn("brand", {
    modified_at: { type: "timestamp", default: pgm.func("now()") },
    modified_by: { type: "uuid" },
  });
};
