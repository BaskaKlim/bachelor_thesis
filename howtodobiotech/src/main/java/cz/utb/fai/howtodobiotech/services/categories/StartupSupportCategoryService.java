package cz.utb.fai.howtodobiotech.services.categories;
import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import cz.utb.fai.howtodobiotech.repositories.categories.StartupSupportCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StartupSupportCategoryService {

    @Autowired
    private StartupSupportCategoryRepository startupSupportCategoryRepository;

    public List<StartupSupportCategory> getAllCategories() {
        return startupSupportCategoryRepository.findAll();
    }

    public Optional<StartupSupportCategory> getCategoryByName(String name) {
        return startupSupportCategoryRepository.findByName(name);
    }

    public Optional<StartupSupportCategory> getCategoryById(Integer id) {
        return startupSupportCategoryRepository.findById(id);
    }

}
