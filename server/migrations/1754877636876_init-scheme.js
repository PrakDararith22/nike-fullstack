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
  pgm.createExtension("uuid-ossp", { ifNotExists: true });
  pgm.createExtension("citext", { ifNotExists: true });
  // 2. FUNCTIONS
  pgm.sql(`
    CREATE OR REPLACE FUNCTION update_modified_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.modified_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // 3. TABLES (in dependency order)

  // Users table (no dependencies)
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
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
    email: {
      type: "varchar(255)",
      unique: true,
      notNull: true,
      check: "length(email) >= 8 AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'",
    },
    password: {
      type: "varchar(255)",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    modified_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  // Brand table (depends on users)
  pgm.createTable("brand", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    name: {
      type: "varchar(20)",
      unique: true,
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    created_by: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
    },
    modified_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    modified_by: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
    },
  });

  // Gender table (depends on users)
  pgm.createTable("gender", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    gender: {
      type: "varchar(20)",
      unique: true,
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    created_by: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
    },
    modified_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    modified_by: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
    },
  });

  // Category table (depends on users)
  pgm.createTable("category", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    category: {
      type: "varchar(20)",
      unique: true,
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    created_by: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
    },
    modified_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    modified_by: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
    },
  });

  // Products table (depends on brand, gender, category, users)
  pgm.createTable("products", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    brand_id: {
      type: "uuid",
      notNull: true,
      references: "brand(id)",
    },
    gender_id: {
      type: "uuid",
      notNull: true,
      references: "gender(id)",
    },
    category_id: {
      type: "uuid",
      notNull: true,
      references: "category(id)",
    },
    description: "text",
    price: {
      type: "numeric(10,2)",
      notNull: true,
      check: "price > 0",
    },
    total_quantity: {
      type: "integer",
      notNull: true,
      check: "total_quantity > 0",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    created_by: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
    },
    modified_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  // Cart table (depends on users)
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

  // Product_size table (depends on products)
  pgm.createTable("product_size", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    size: "varchar(20)",
    quantity: {
      type: "integer",
      notNull: true,
      check: "quantity > 0",
    },
    product_id: {
      type: "uuid",
      notNull: true,
      references: "products(id)",
      onDelete: "CASCADE",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    modified_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  // Add unique constraint for product_size
  pgm.addConstraint("product_size", "product_size_product_id_size_unique", {
    unique: ["product_id", "size"],
  });

  // Cart_item table (depends on products, cart, product_size)
  pgm.createTable("cart_item", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    product_id: {
      type: "uuid",
      notNull: true,
      references: "products(id)",
      onDelete: "CASCADE",
    },
    size: {
      type: "varchar(20)",
      notNull: true,
    },
    quantity: {
      type: "integer",
      notNull: true,
      check: "quantity > 0",
    },
    add_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    cart_id: {
      type: "uuid",
      notNull: true,
      references: "cart(id)",
      onDelete: "CASCADE",
    },
  });

  // Add constraints for cart_item
  pgm.addConstraint("cart_item", "cart_item_cart_id_product_id_unique", {
    unique: ["cart_id", "product_id"],
  });

  pgm.sql(`
    ALTER TABLE cart_item 
    ADD CONSTRAINT cart_item_product_id_size_fk 
    FOREIGN KEY (product_id, size) 
    REFERENCES product_size (product_id, size) 
    ON DELETE RESTRICT;
  `);

  // Wishlist table (depends on users)
  pgm.createTable("wishlist", {
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

  // Wishlist_item table (depends on products, wishlist)
  pgm.createTable("wishlist_item", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    product_id: {
      type: "uuid",
      notNull: true,
      references: "products(id)",
      onDelete: "CASCADE",
    },
    add_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    wishlist_id: {
      type: "uuid",
      notNull: true,
      references: "wishlist(id)",
      onDelete: "CASCADE",
    },
  });

  // Add unique constraint for wishlist_item
  pgm.addConstraint("wishlist_item", "wishlist_item_product_id_wishlist_id", {
    unique: ["product_id", "wishlist_id"],
  });

  // Product_feature table (depends on products)
  pgm.createTable("product_feature", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    feature: {
      type: "varchar(255)",
      notNull: true,
    },
    product_id: {
      type: "uuid",
      notNull: true,
      references: "products(id)",
      onDelete: "CASCADE",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    modified_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  // Product_discount table (depends on users, products)
  pgm.createTable("product_discount", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    is_active: {
      type: "boolean",
      notNull: true,
      default: true,
    },
    type: {
      type: "varchar(20)",
      notNull: true,
      check: "type IN ('percentage', 'fixed_amount', 'buy_x_get_y')",
    },
    value: {
      type: "numeric(10,2)",
      notNull: true,
      check: "value > 0",
    },
    start_date: {
      type: "timestamp",
      notNull: true,
    },
    end_date: {
      type: "timestamp",
      notNull: true,
      check: "start_date < end_date",
    },
    max_uses: "integer",
    current_uses: {
      type: "integer",
      notNull: true,
      default: 0,
      check: "current_uses >= 0",
    },
    max_uses_per_customer: "integer",
    minimum_quantity: "integer",
    minimum_order_amount: "numeric(10,2)",
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    created_by: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
    },
    modified_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    product_id: {
      type: "uuid",
      unique: true,
      notNull: true,
      references: "products(id)",
      onDelete: "CASCADE",
    },
  });

  // Add additional check constraints for product_discount
  pgm.addConstraint("product_discount", "product_discount_max_uses_positive", {
    check: "max_uses IS NULL OR max_uses >= 0",
  });

  pgm.addConstraint("product_discount", "product_discount_max_uses_per_customer_positive", {
    check: "max_uses_per_customer IS NULL OR max_uses_per_customer >= 0",
  });

  pgm.addConstraint("product_discount", "product_discount_minimum_quantity_positive", {
    check: "minimum_quantity IS NULL OR minimum_quantity >= 0",
  });

  pgm.addConstraint("product_discount", "product_discount_minimum_order_amount_positive", {
    check: "minimum_order_amount IS NULL OR minimum_order_amount >= 0",
  });

  // 4. TRIGGERS (after tables and functions)
  pgm.sql(`
    CREATE TRIGGER trg_update_users_modified_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_at_column();
  `);

  pgm.sql(`
    CREATE TRIGGER trg_update_products_modified_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_at_column();
  `);

  pgm.sql(`
    CREATE TRIGGER trg_update_product_discount_modified_at
    BEFORE UPDATE ON product_discount
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_at_column();
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = pgm => {
  // Drop triggers first
  pgm.sql("DROP TRIGGER IF EXISTS trg_update_product_discount_modified_at ON product_discount;");
  pgm.sql("DROP TRIGGER IF EXISTS trg_update_products_modified_at ON products;");
  pgm.sql("DROP TRIGGER IF EXISTS trg_update_users_modified_at ON users;");

  // Drop tables in reverse dependency order
  pgm.dropTable("product_discount");
  pgm.dropTable("product_feature");
  pgm.dropTable("wishlist_item");
  pgm.dropTable("wishlist");
  pgm.dropTable("cart_item");
  pgm.dropTable("product_size");
  pgm.dropTable("cart");
  pgm.dropTable("products");
  pgm.dropTable("category");
  pgm.dropTable("gender");
  pgm.dropTable("brand");
  pgm.dropTable("users");

  // Drop functions
  pgm.sql("DROP FUNCTION IF EXISTS update_modified_at_column();");

  // Drop extensions
  pgm.dropExtension("uuid-ossp", { ifExists: true });
};
