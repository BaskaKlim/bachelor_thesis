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
    return http.get(`/by-biotech-category/${biotechCategoryName}`);
  }

  getInnovationByCountry(countryName) {
    return http.get(`/by-country/${countryName}`);
  }

  getInnovationOptByTitle(title) {
    return http.get(`/by-title/${title}`);
  }
}
const innovationDataServiceInstance = new InnovationDataService();

export default innovationDataServiceInstance;