package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Categories;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.ExpertCategory;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Categories.ExpertCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExpertCategoryService {

    ExpertCategoryRepository expertCategoryRepository;

    @Autowired
    public ExpertCategoryService(ExpertCategoryRepository expertCategoryRepository) {
        this.expertCategoryRepository = expertCategoryRepository;
    }

    public Optional<ExpertCategory> getExpertCategoryById(Integer id) {
        return expertCategoryRepository.findById(id);
    }

    public ExpertCategory addExpertCategory(ExpertCategory biotechCategory) {
        return  expertCategoryRepository.save(biotechCategory);
    }
    public void deleteExpertCategoryById(Integer id) {
        expertCategoryRepository.deleteById(id);
    }

    public ExpertCategory updateExpertCategory(ExpertCategory biotechCategory) {
        return expertCategoryRepository.save(biotechCategory);
    }
    public List<ExpertCategory> getAllExpertCategories() {
        List<ExpertCategory> expertCategories = new ArrayList<>();
        expertCategoryRepository.findAll().forEach(expertCategories::add);

        return expertCategories;
    }

}
