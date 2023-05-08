import http from "../http-common";

class ExpertDataService {
  getAllExperts() {
    return http.get("/experts");
  }

  getExpertById(id) {
    return http.get(`/experts/${id}`);
  }

  createExpert(data) {
    return http.post("/experts", data);
  }

  updateExpert(id, data) {
    return http.put(`/experts/${id}`, data);
  }

  deleteExpert(id) {
    return http.delete(`/experts/${id}`);
  }

  getExpertByLastName(lastName) {
    return http.get(`/experts/by-last-name/${lastName}`);
  }

  getExpertByExpertise(expertiseName) {
    return http.get(`/experts/by-expertise/${expertiseName}`);
  }

  getExpertByCountry(countryName) {
    return http.get(`/experts/by-country/${countryName}`);
  }
}
const instance = new ExpertDataService();
export default instance;
