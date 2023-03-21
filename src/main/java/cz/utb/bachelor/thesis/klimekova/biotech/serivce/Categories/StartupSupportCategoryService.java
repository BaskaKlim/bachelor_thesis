package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Categories;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.StartupSupportCategory;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Categories.StartupSupportCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StartupSupportCategoryService {

    StartupSupportCategoryRepository startupSupportCategoryRepository;

    @Autowired
    public StartupSupportCategoryService(StartupSupportCategoryRepository skillCategoryRepository) {
        this.startupSupportCategoryRepository = startupSupportCategoryRepository;
    }

    public Optional<StartupSupportCategory> getStartupSupportCategoryById(Integer id) {
        return startupSupportCategoryRepository.findById(id);
    }

    public StartupSupportCategory addStartupSupportCategory(StartupSupportCategory startupSupportCategory) {
        return  startupSupportCategoryRepository.save(startupSupportCategory);
    }
    public void deleteStartupSupportCategoryById(Integer id) {
        startupSupportCategoryRepository.deleteById(id);
    }

    public StartupSupportCategory updateStartupSupportCategory(StartupSupportCategory startupSupportCategory) {
        return startupSupportCategoryRepository.save(startupSupportCategory);
    }
    public List<StartupSupportCategory> getAllStartupSupportCategories() {
        List<StartupSupportCategory> startupSupportCategories = new ArrayList<>();
        startupSupportCategoryRepository.findAll().forEach(startupSupportCategories::add);

        return startupSupportCategories;
    }

}
