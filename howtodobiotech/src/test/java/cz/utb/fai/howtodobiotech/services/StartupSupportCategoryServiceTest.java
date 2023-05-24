package cz.utb.fai.howtodobiotech.services;

import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import cz.utb.fai.howtodobiotech.repositories.categories.StartupSupportCategoryRepository;
import cz.utb.fai.howtodobiotech.services.categories.StartupSupportCategoryService;
import cz.utb.fai.howtodobiotech.utils.enums.ESupportCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StartupSupportCategoryServiceTest {

    @Mock
    private StartupSupportCategoryRepository startupSupportCategoryRepository;

    @InjectMocks
    private StartupSupportCategoryService startupSupportCategoryService;

    private StartupSupportCategory category1;
    private StartupSupportCategory category2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        category1 = new StartupSupportCategory();
        category1.setId(1);
        category1.setName(ESupportCategory.INVESTMENT);

        category2 = new StartupSupportCategory();
        category2.setId(2);
        category2.setName(ESupportCategory.INCUBATOR);
    }

    @Test
    void testGetAllCategories() {
        List<StartupSupportCategory> categories = Arrays.asList(category1, category2);
        when(startupSupportCategoryRepository.findAll()).thenReturn(categories);
        List<StartupSupportCategory> result = startupSupportCategoryService.getAllCategories();

        assertEquals(2, result.size());
        assertEquals(category1, result.get(0));
        assertEquals(category2, result.get(1));
        verify(startupSupportCategoryRepository, times(1)).findAll();
    }

    @Test
    void testGetCategoryByName_ExistingCategory() {
        String categoryName = "Category 1";
        when(startupSupportCategoryRepository.findByName(categoryName)).thenReturn(Optional.of(category1));
        Optional<StartupSupportCategory> result = startupSupportCategoryService.getCategoryByName(categoryName);

        assertTrue(result.isPresent());
        assertEquals(category1, result.get());
        verify(startupSupportCategoryRepository, times(1)).findByName(categoryName);
    }

    @Test
    void testGetCategoryByName_NonExistingCategory() {
        String categoryName = "Non-existing Category";
        when(startupSupportCategoryRepository.findByName(categoryName)).thenReturn(Optional.empty());
        Optional<StartupSupportCategory> result = startupSupportCategoryService.getCategoryByName(categoryName);

        assertFalse(result.isPresent());
        verify(startupSupportCategoryRepository, times(1)).findByName(categoryName);
    }

    @Test
    void testGetCategoryById_ExistingCategory() {
        int categoryId = 2;
        when(startupSupportCategoryRepository.findById(categoryId)).thenReturn(Optional.of(category2));
        Optional<StartupSupportCategory> result = startupSupportCategoryService.getCategoryById(categoryId);

        assertTrue(result.isPresent());
        assertEquals(category2, result.get());
        verify(startupSupportCategoryRepository, times(1)).findById(categoryId);
    }

    @Test
    void testGetCategoryById_NonExistingCategory() {
        int categoryId = 3;
        when(startupSupportCategoryRepository.findById(categoryId)).thenReturn(Optional.empty());
        Optional<StartupSupportCategory> result = startupSupportCategoryService.getCategoryById(categoryId);

        assertFalse(result.isPresent());
        verify(startupSupportCategoryRepository, times(1)).findById(categoryId);
    }
}
