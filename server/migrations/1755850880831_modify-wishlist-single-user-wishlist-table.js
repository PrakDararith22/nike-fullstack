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
  pgm.renameTable("wishlist_item", "wishlist_cart");

  pgm.dropColumn("wishlist_cart", "wishlist_id");

  pgm.addColumn("wishlist_cart", {
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
  });
};
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = pgm => {
  pgm.dropColumn("wishlist_cart", "user_id");

  pgm.addColumn("wishlist_cart", {
    wishlist_id: {
      type: "uuid",
      notNull: true,
      references: "wishlist(id)",
      onDelete: "CASCADE",
    },
  });

  pgm.renameTable("wishlist_cart", "wishlist_item");
};
