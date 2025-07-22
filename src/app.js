import { Router } from "./utils/router,";
import { homePage, productDetail, productList } from "./pages/index";

const router = new Router("app");

window.addEventListener("DOMContentLoaded", () => {
  router.init();
});
