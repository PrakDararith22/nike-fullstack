/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
export const up = pgm => {
  pgm.addColumn("users", {
    username: {
      type: "varchar(30)",
      notNull: true,
      check: "username ~* '^[A-Za-z0-9]+$'",
    },
  });

  pgm.dropColumn("users", "first_name");
  pgm.dropColumn("users", "last_name");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
export const down = pgm => {
  pgm.addColumns("users", {
    first_name: {
      type: "varchar(30)",
      notNull: true,
      check: "first_name ~* '^[A-Za-z0-9]+$'",
    },
    last_name: {
      type: "varchar(30)",
      notNull: true,
      check: "last_name ~* '^[A-Za-z0-9]+$'",
    },
  });

  pgm.dropColumn("users", "username");
};
