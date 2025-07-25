import { Router } from "./utils/router,";
import data from "./data/data.json";
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

router.route("/", homePage());
router.route("/home", homePage());
router.route("/signin", authPage("signin"));
router.route("/password", authPage("password"));
router.route("/reset", authPage("reset"));
router.route("/cart", cartPage());
router.route("/favorite", favoritePage());

router.route("/:category", ({ category }) => {
  const categoryLower = category.toLowerCase();

  const filtered = products.filter(
    product =>
      product.gender.toLowerCase() === category.toLowerCase() ||
      product.brand.toLowerCase() === category.toLowerCase() ||
      (category.toLowerCase() === "new-and-featured" && product.availability?.isNewRelease) ||
      (category.toLowerCase() === "sale" && product.price?.discount?.isActive)
  );
  console.log(filtered);

  return productList(filtered, category);
});

router.route("/:category/:productId", ({ category, productId }) => {
  const productData = products.find(
    product =>
      product.id.toString() === productId &&
      (product.gender.toLowerCase() === category.toLowerCase() ||
        product.brand.toLowerCase() === category.toLowerCase() ||
        (category.toLowerCase() === "new-and-featured" && product.availability?.isNewRelease) ||
        (category.toLowerCase() === "sale" && product.price?.discount?.isActive))
  );
  return productData ? productDetail(productData) : "<h1>Product Not Found</h1>";
});

window.addEventListener("DOMContentLoaded", () => {
  router.init();
});
