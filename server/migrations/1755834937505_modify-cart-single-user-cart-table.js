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
  pgm.renameTable("cart_item", "user_cart");
  pgm.addColumns("user_cart", {
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE", // optional
    },
  });
  pgm.dropColumn("user_cart", "cart_id");
  pgm.dropTable("cart");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = pgm => {
  pgm.createTable("cart", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    user_id: {
      type: "uuid",
      unique: true,
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
  });
  pgm.addColumn("cart_item", {
    cart_id: {
      type: "uuid",
      notNull: true,
      references: "cart(id)",
      onDelete: "CASCADE",
    },
  });

  pgm.dropColumns("user_cart", ["user_id"]);

  pgm.renameTable("user_cart", "cart_item");
};
