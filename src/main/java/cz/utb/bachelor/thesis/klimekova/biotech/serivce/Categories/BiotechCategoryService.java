package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Categories;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.BiotechCategory;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Categories.BiotechCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class  BiotechCategoryService {

    BiotechCategoryRepository biotechCategoryRepository;

    @Autowired
    public BiotechCategoryService (BiotechCategoryRepository biotechCategoryRepository) {
        this.biotechCategoryRepository = biotechCategoryRepository;
    }

    public Optional<BiotechCategory> getBiotechCategoryById(Integer id) {
        return biotechCategoryRepository.findById(id);
    }

    public BiotechCategory addBiotechCategory(BiotechCategory biotechCategory) {
        return  biotechCategoryRepository.save(biotechCategory);
    }
    public void deleteBiotechCategoryById(Integer id) {
        biotechCategoryRepository.deleteById(id);
    }

    public BiotechCategory updateBiotechCategory(BiotechCategory biotechCategory) {
        return biotechCategoryRepository.save(biotechCategory);
    }
    public List<BiotechCategory> getAllBiotechCategories() {
        List<BiotechCategory> biotechCategories = new ArrayList<>();
        biotechCategoryRepository.findAll().forEach(biotechCategories::add);

        return biotechCategories;
    }

}
