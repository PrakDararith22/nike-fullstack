export class Router {
  constructor(rootId = "app") {
    this.appRoot = document.getElementById(rootId);
    this.routes = new Map();
    this.history = window.history;
    this.location = window.location;
  }

  route(path, view) {
    this.routes.set(path, typeof view === "function" ? view : () => view);
  }

  render(path) {
    const view = this.routes.get(path) || (() => "<h1>404</h1><p>Page not found</p>");
    this.appRoot.innerHTML = view();
  }

  navigate(path) {
    this.history.pushState({}, "", path);
    this.render(path);
  }

  handleLinkClicks(e) {
    const link = e.target.closest("a[data-link]");
    if (link) {
      e.preventDefault();
      this.navigate(link.getAttribute("href"));
    }
  }

  init() {
    this.render(this.location.pathname);
    document.body.addEventListener("click", this.handleLinkClicks.bind(this));
    window.addEventListener("popstate", () => this.render(this.location.pathname));
  }
}
