import http from "../http-common";

class StartupOptDataService {
  getAllStartupOpts() {
    return http.get("/startup-opportunities");
  }

  getStartupOptById(id) {
    return http.get(`/startup-opportunities/${id}`);
  }

  createStartupOpt(data) {
    return http.post("/startup-opportunities", data);
  }

  updateStartupOpt(id, data) {
    return http.put(`/startup-opportunities/${id}`, data);
  }

  deleteStartupOpt(id) {
    return http.delete(`/startup-opportunities/${id}`);
  }

  getStartupOptByBiotechCategory(biotechCategoryName) {
    return http.get(`/startup-opportunities/by-biotech-category/${biotechCategoryName}`);
  }

  getStartupOptBySupportCategory(supportCategoryName) {
    return http.get(`/startup-opportunities/by-support-category/${supportCategoryName}`);
  }

  getStartupOptByCountry(countryName) {
    return http.get(`/startup-opportunities/by-country/${countryName}`);
  }

  getStartupOptByTitle(title) {
    return http.get(`/startup-opportunities/by-title/${title}`);
  }

  getStartupOptByProvider(provider) {
    return http.get(`/startup-opportunities/by-provider/${provider}`);
  }

  getStartupOptByStartDate(startDate) {
    return http.get(`/startup-opportunities/by-start-date/${startDate}`);
  }

  getStartupOptByEndDate(endDate) {
    return http.get(`/startup-opportunities/by-end-date/${endDate}`);
  }

   getAllCategories() {
    return http.get("/startup-opportunities/categories");
  }
  getAllCountries() {
    return http.get('/startup-opportunities/countries');
  }

  getAllSupportCategories(){
    return http.get("/startup-opportunities/support-categories");
  }


  getStartupOptsByAccountId(accountId) {
    return http.get(`/startup-opportunities/by-account/${accountId}`);
  }

}

const instance = new StartupOptDataService();
export default instance;
