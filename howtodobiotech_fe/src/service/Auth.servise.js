import http from "../http-common";
class AuthService {
  register(userData) {
    return http.post("/auth/signup", userData);
  }

  login(credentials) {
    return http.post("/auth/authenticate", credentials)
      .then(response => {
        const authToken = response.data.token;
        localStorage.setItem("authToken", authToken);
        return response;
      });
  }

  logout() {
    localStorage.removeItem("authToken");
    return http.post("/auth/logout");
  }
}

const authService = new AuthService();
export default authService;