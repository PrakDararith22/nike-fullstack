export const auth = {
  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  },

  saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  },

  getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : { role: "guest", isAuthenticated: false };
  },

  setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  register(email, password, role = "user") {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Invalid email format.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const users = this.getUsers();
    const exists = users.some(u => u.email === email);
    if (exists) {
      throw new Error("Email is already registered.");
    }

    users.push({ email, password, role });
    this.saveUsers(users);
  },

  login(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const users = this.getUsers();
    console.log(typeof users);
    const found = users.find(user => user.email === email && user.password === password);

    if (!found) {
      throw new Error("Invalid email or password.");
    }

    const currentUser = { ...found, isAuthenticated: true };
    this.setCurrentUser(currentUser);
    return true;
  },

  logout() {
    localStorage.removeItem("currentUser");
  },

  resetPassword(email, newPassword) {
    if (!email || !newPassword) {
      throw new Error("Email and new password are required.");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Invalid email format.");
    }

    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
      throw new Error("No user found with this email.");
    }

    users[userIndex].password = newPassword;
    this.saveUsers(users);

    // If currently logged-in user is being updated, update session too
    const current = this.getCurrentUser();
    if (current.email === email) {
      current.password = newPassword;
      this.setCurrentUser(current);
    }

    return true;
  },
};
