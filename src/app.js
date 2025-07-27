import { Router } from "@utility";
import data from "@data";
import {
  homePage,
  productDetail,
  productList,
  authPage,
  cartPage,
  favoritePage,
} from "./pages/index";

const router = new Router("app");
const products = data.datas;

if (!localStorage.getItem("users")) {
  localStorage.setItem(
    "users",
    JSON.stringify([{ email: "test@example.com", password: "password123", role: "user" }])
  );
}

function filterByCategory(category) {
  const c = category.toLowerCase();
  return products.filter(
    product =>
      product.gender.toLowerCase() === c ||
      product.brand.toLowerCase() === c ||
      (c === "new-and-featured" && product.availability?.isNewRelease) ||
      (c === "sale" && product.price?.discount?.isActive)
  );
}

router.route("/", () => homePage(), { roles: ["guest", "user"] });
router.route("/home", () => homePage(), { roles: ["guest", "user"] });
router.route("/signin", () => authPage("signin"), { roles: ["guest"] });
router.route("/password", () => authPage("password"), { roles: ["guest"] });
router.route("/reset", () => authPage("reset"), { roles: ["guest"] });
router.route("/cart", () => cartPage(), { roles: ["guest", "user"] });
router.route("/favorite", () => favoritePage(), { roles: ["user"] });

router.route(
  "/:category",
  ({ category }) => {
    const filtered = filterByCategory(category);
    return productList(filtered, category);
  },
  { roles: ["user", "guest"] }
);

router.route(
  "/:category/:productId",
  ({ category, productId }) => {
    const filtered = filterByCategory(category);
    const productData = filtered.find(p => p.id.toString() === productId);
    return productData ? productDetail(productData) : "<h1>Product Not Found</h1>";
  },
  { roles: ["user", "guest"] }
);

window.addEventListener("DOMContentLoaded", () => {
  router.init();
});
