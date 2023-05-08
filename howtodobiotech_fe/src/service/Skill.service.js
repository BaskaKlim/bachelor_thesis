import http from "../http-common";

class SkillOptDataService {
  getAllSkillOpts() {
    return http.get("/skill-opportunities");
  }

  getSkillOptById(id) {
    return http.get(`/skill-opportunities/${id}`);
  }

  createSkillOpt(data) {
    return http.post("/skill-opportunities", data);
  }

  updateSkillOpt(id, data) {
    return http.put(`/skill-opportunities/${id}`, data);
  }

  deleteSkillOpt(id) {
    return http.delete(`/skill-opportunities/${id}`);
  }

  getSkillOptByBiotechCategory(biotechCategoryName) {
    return http.get(`/skill-opportunities/by-biotech-category/${biotechCategoryName}`);
  }

  getSkillOptBySkillCategory(skillCategoryName) {
    return http.get(`/skill-opportunities/by-skill-category/${skillCategoryName}`);
  }

  getSkillOptByCountry(countryName) {
    return http.get(`/skill-opportunities/by-country/${countryName}`);
  }

  getSkillOptByTitle(title) {
    return http.get(`/skill-opportunities/by-title/${title}`);
  }

  getSkillOptByOrganizer(organizer) {
    return http.get(`/skill-opportunities/by-organizer/${organizer}`);
  }

  getSkillOptByStartDate(startDate) {
    return http.get(`/skill-opportunities/by-start-date/${startDate}`);
  }

  getSkillOptByEndDate(endDate) {
    return http.get(`/skill-opportunities/by-end-date/${endDate}`);
  }

  getAllCategories() {
    return http.get("/categories");
  }

  getAllCountries() {
    return http.get("/countries");
  }

  getAllSupportCategories() {
    return http.get("/support-categories");
  }
}

const instance = new SkillOptDataService();
export default instance;
