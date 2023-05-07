package cz.utb.fai.howtodobiotech.api.categories;

import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import cz.utb.fai.howtodobiotech.services.categories.StartupSupportCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/support-categories")
public class StartupSupportCategoryController {

    @Autowired
    private StartupSupportCategoryService startupSupportCategoryService;

    @GetMapping
    public ResponseEntity<List<StartupSupportCategory>> getAllSupportCategories() {
        List<StartupSupportCategory> supportCategories = startupSupportCategoryService.getAllCategories();
        return ResponseEntity.ok().body(supportCategories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StartupSupportCategory> getSupportCategoryById(@PathVariable("id") Integer id) {
        Optional<StartupSupportCategory> supportCategory = startupSupportCategoryService.getCategoryById(id);

        if (supportCategory.isPresent()) {
            return ResponseEntity.ok().body(supportCategory.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
