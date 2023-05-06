package cz.utb.fai.howtodobiotech.api.categories;
import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.services.categories.BiotechCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class BiotechCategoryController {

    @Autowired
    private BiotechCategoryService biotechCategoryService;

    @GetMapping
    public ResponseEntity<List<BiotechCategory>> getAllCategories() {
        List<BiotechCategory> categories = biotechCategoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BiotechCategory> getCategoryById(@PathVariable("id") Integer id) {
        Optional<BiotechCategory> category = biotechCategoryService.getCategoryById(id);

        if (category.isPresent()) {
            return ResponseEntity.ok().body(category.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
