import { Router } from "./utils/router,";
import { homePage, productDetail, productList, authPage, cartPage } from "./pages/index";

const router = new Router("app");

router.route("/", homePage());
router.route("/home", homePage());
router.route("/product-list", productList());
router.route("/product-detail", productDetail());
router.route("/signin", authPage("signin"));
router.route("/password", authPage("password"));
router.route("/reset", authPage("reset"));
router.route("/cart", cartPage());
window.addEventListener("DOMContentLoaded", () => {
  router.init();
});
