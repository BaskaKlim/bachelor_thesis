package cz.utb.fai.howtodobiotech.services.categories;
import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.repositories.categories.BiotechCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BiotechCategoryService {

    @Autowired
    private BiotechCategoryRepository biotechCategoryRepository;

    public List<BiotechCategory> getAllCategories() {
        return biotechCategoryRepository.findAll();
    }

    public Optional<BiotechCategory> getCategoryByName(String name) {
        return biotechCategoryRepository.findByName(name);
    }

    public Optional<BiotechCategory> getCategoryById(Integer id) {
        return biotechCategoryRepository.findById(id);
    }

}
