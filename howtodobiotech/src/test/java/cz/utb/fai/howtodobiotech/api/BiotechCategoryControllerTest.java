package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.api.categories.BiotechCategoryController;
import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.services.categories.BiotechCategoryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BiotechCategoryControllerTest {
    @Mock
    private BiotechCategoryService biotechCategoryService;

    @InjectMocks
    private BiotechCategoryController biotechCategoryController;

    private MockMvc mockMvc;

    @Test
    void testGetAllCategories() {
        List<BiotechCategory> categories = new ArrayList<>();
        // Add biotech categories to the list
        categories.add(new BiotechCategory()); // Add one or more biotech categories to the list

        when(biotechCategoryService.getAllCategories()).thenReturn(categories);

        ResponseEntity<List<BiotechCategory>> response = biotechCategoryController.getAllCategories();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(categories, response.getBody());
    }

    @Test
    void testGetCategoryById() {
        int categoryId = 1;
        BiotechCategory category = new BiotechCategory();
        category.setId(categoryId);
        Optional<BiotechCategory> categoryData = Optional.of(category);
        when(biotechCategoryService.getCategoryById(categoryId)).thenReturn(categoryData);

        ResponseEntity<BiotechCategory> response = biotechCategoryController.getCategoryById(categoryId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(categoryData.get(), response.getBody());
    }
}
