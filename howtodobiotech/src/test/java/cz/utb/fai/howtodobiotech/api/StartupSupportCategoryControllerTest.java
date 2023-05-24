package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.api.categories.StartupSupportCategoryController;
import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import cz.utb.fai.howtodobiotech.services.categories.StartupSupportCategoryService;
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
class StartupSupportCategoryControllerTest {
    @Mock
    private StartupSupportCategoryService startupSupportCategoryService;

    @InjectMocks
    private StartupSupportCategoryController startupSupportCategoryController;

    private MockMvc mockMvc;

    @Test
    void testGetAllSupportCategories() {
        List<StartupSupportCategory> supportCategories = new ArrayList<>();
        supportCategories.add(new StartupSupportCategory());
        supportCategories.add(new StartupSupportCategory());

        when(startupSupportCategoryService.getAllCategories()).thenReturn(supportCategories);

        ResponseEntity<List<StartupSupportCategory>> response = startupSupportCategoryController.getAllSupportCategories();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(supportCategories, response.getBody());
    }

    @Test
    void testGetSupportCategoryById() {
        int categoryId = 1;
        StartupSupportCategory category = new StartupSupportCategory();
        category.setId(categoryId);
        Optional<StartupSupportCategory> categoryData = Optional.of(category);

        when(startupSupportCategoryService.getCategoryById(categoryId)).thenReturn(categoryData);

        ResponseEntity<StartupSupportCategory> response = startupSupportCategoryController.getSupportCategoryById(categoryId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(categoryData.get(), response.getBody());
    }
}
