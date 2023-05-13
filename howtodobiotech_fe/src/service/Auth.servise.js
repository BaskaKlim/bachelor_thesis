import http from "../http-common";

class AuthService {
  register(userData) {
    return http.post("/auth/signup", userData);
  }

  login(credentials) {
    return http.post("/auth/signin", credentials);
  }

  logout() {
    return http.post("/auth/signout");
  }
}

const authService = new AuthService();
export default authService;
