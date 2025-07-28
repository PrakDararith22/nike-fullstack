import { Router } from "@utility";
import data from "@data";
import {
  homePage,
  productDetail,
  productList,
  authPage,
  cartPage,
  favoritePage,
  notFoundPage,
} from "./pages/pages";

const router = new Router("app");
const products = data.data;
const Categories = ["new-and-featured", "men", "women", "kids", "jordan", "sale"];

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

router.route("/", () => homePage(products), { roles: ["guest", "user"] });
router.route("/home", () => homePage(products), { roles: ["guest", "user"] });
router.route("/signin", () => authPage("signin"), { roles: ["guest"] });
router.route("/password", () => authPage("password"), { roles: ["guest"] });
router.route("/reset", () => authPage("reset"), { roles: ["guest"] });
router.route("/cart", () => cartPage(), { roles: ["guest", "user"] });
router.route("/favorite", () => favoritePage(), { roles: ["user"] });
router.route(
  "/:category",
  ({ category }) => {
    if (!Categories.includes(category.toLowerCase())) {
      return notFoundPage();
    }
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
    return productData ? productDetail(productData, products) : "<h1>Product Not Found</h1>";
  },
  { roles: ["user", "guest"] }
);

window.addEventListener("DOMContentLoaded", () => {
  router.init();
});
