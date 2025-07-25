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

  static matchRoute(path, routePattern) {
    const pathParts = path.split("/").filter(Boolean);
    const patternParts = routePattern.split("/").filter(Boolean);

    if (pathParts.length !== patternParts.length) return null;

    const params = {};

    const matched = pathParts.every((part, i) => {
      const patternPart = patternParts[i];
      if (patternPart.startsWith(":")) {
        const paramName = patternPart.slice(1);
        params[paramName] = part;
        return true;
      }
      return patternPart === part;
    });

    return matched ? params : null;
  }

  render(path) {
    const matched = Array.from(this.routes.entries()).some(([routePattern, view]) => {
      const params = Router.matchRoute(path, routePattern);
      if (params !== null) {
        this.appRoot.innerHTML = view(params);
        return true;
      }
      return false;
    });
    if (!matched) {
      this.appRoot.innerHTML = "<h1>404</h1><p>Page not found</p>";
    }
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
