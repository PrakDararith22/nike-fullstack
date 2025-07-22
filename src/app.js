import { Router } from "./utils/router,";
import { homePage, productDetail, productList } from "./pages/index";

const router = new Router("app");

router.route("/", homePage());
router.route("/home", homePage());
router.route("/product-list", productList());
router.route("/product-detail", productDetail());

window.addEventListener("DOMContentLoaded", () => {
  router.init();
});
