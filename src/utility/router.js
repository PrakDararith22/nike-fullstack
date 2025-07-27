export class Router {
  constructor(rootId = "app") {
    this.appRoot = document.getElementById(rootId);
    this.routes = new Map(); // routePath -> {view, meta}
    this.history = window.history;
    this.location = window.location;
  }

  // Register a route with optional meta: { roles: ["user", "admin"] }
  route(path, view, meta = {}) {
    this.routes.set(path, {
      view: typeof view === "function" ? view : () => view,
      meta,
    });
  }

  // Match dynamic routes like /:category/:id
  static matchRoute(path, pattern) {
    const pathParts = path.split("/").filter(Boolean);
    const patternParts = pattern.split("/").filter(Boolean);

    if (pathParts.length !== patternParts.length) return null;

    const params = {};

    const matched = patternParts.every((patternPart, i) => {
      if (patternPart.startsWith(":")) {
        const key = patternPart.slice(1);
        params[key] = pathParts[i];
        return true;
      }
      return patternPart === pathParts[i];
    });

    return matched ? params : null;
  }

  // Always get latest currentUser from localStorage
  static getCurrentUser() {
    const saved = localStorage.getItem("currentUser");
    if (saved) return JSON.parse(saved);

    const guest = { role: "guest", isAuthenticated: false };
    localStorage.setItem("currentUser", JSON.stringify(guest));
    return guest;
  }

  // Check route access permission
  static canAccess(meta) {
    if (!meta?.roles || meta.roles.length === 0) return true;

    const user = Router.getCurrentUser();
    return meta.roles.includes(user.role);
  }

  // Render route by matching path
  render(path) {
    const matched = Array.from(this.routes.entries()).some(([pattern, { view, meta }]) => {
      const params = Router.matchRoute(path, pattern);
      if (params !== null) {
        if (Router.canAccess(meta)) {
          this.appRoot.innerHTML = view(params);
        } else {
          // Redirect if not authorized and not already on signin page
          if (path !== "/signin") {
            this.navigate("/signin");
            return true;
          }
          // If already on signin page, render it normally
          this.appRoot.innerHTML = view(params);
        }
        return true;
      }
      return false;
    });

    if (!matched) {
      this.appRoot.innerHTML = "<h1>404</h1><p>Page not found</p>";
    }
  }

  // Navigate to new path
  navigate(path) {
    this.history.pushState({}, "", path);
    this.render(path);
  }

  // Handle anchor tag click interception
  handleLinkClicks(e) {
    const link = e.target.closest("a[data-link]");
    if (link) {
      e.preventDefault();
      const href = link.getAttribute("href");
      this.navigate(href);
    }
  }

  // Initialize routing
  init() {
    this.render(this.location.pathname);
    document.body.addEventListener("click", this.handleLinkClicks.bind(this));
    window.addEventListener("popstate", () => this.render(this.location.pathname));
  }
}
