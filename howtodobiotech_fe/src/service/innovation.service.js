import http from "../http-common";

class InnovationDataService {
    getAllInnovations() {
    return http.get("/innovations");
  }

  getInnovationById(id) {
    return http.get(`/innovations/${id}`);
  }

  createInnovation(data) {
    return http.post("/innovations", data);
  }

  updateInnovation(id, data) {
    return http.put(`/innovations/${id}`, data);
  }

  deleteInnovation(id) {
    return http.delete(`/innovations/${id}`);
  }


  getInnovationByBiotechCategory(biotechCategoryName) {
    return http.get(`/innovations/by-biotech-category/${biotechCategoryName}`);
  }

  getInnovationByCountry(countryName) {
    return http.get(`/innovations/by-country/${countryName}`);
  }

  getInnovationOptByTitle(title) {
    return http.get(`/innovations/by-title/${title}`);
  }
}
const instance = new InnovationDataService();
export default instance;