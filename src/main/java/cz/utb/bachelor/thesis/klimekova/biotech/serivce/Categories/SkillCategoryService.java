package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Categories;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.SkillCategory;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Categories.SkillCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SkillCategoryService {

    SkillCategoryRepository skillCategoryRepository;

    @Autowired
    public SkillCategoryService(SkillCategoryRepository skillCategoryRepository) {
        this.skillCategoryRepository = skillCategoryRepository;
    }

    public Optional<SkillCategory> getSkillCategoryById(Integer id) {
        return skillCategoryRepository.findById(id);
    }

    public SkillCategory addSkillCategory(SkillCategory skillCategory) {
        return  skillCategoryRepository.save(skillCategory);
    }
    public void deleteSkillCategoryById(Integer id) {
        skillCategoryRepository.deleteById(id);
    }

    public SkillCategory updateSkillCategory(SkillCategory skillCategory) {
        return skillCategoryRepository.save(skillCategory);
    }
    public List<SkillCategory> getAllSkillCategories() {
        List<SkillCategory> skillCategories = new ArrayList<>();
        skillCategoryRepository.findAll().forEach(skillCategories::add);

        return skillCategories;
    }

}
