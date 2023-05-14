import http from "../http-common";

class AccountService {
  getAllAccounts() {
    return http.get("/accounts");
  }

  getAccountById(id) {
    return http.get(`${"/accounts"}/${id}`);
  }

  createAccount(account) {
    return http.post("/accounts", account);
  }

  updateAccount(id, account) {
    return http.put(`${"/accounts"}/${id}`, account);
  }

  deleteAccount(id) {
    return http.delete(`${"/accounts"}/${id}`);
  }
}

const accountService = new AccountService();
export default accountService;
