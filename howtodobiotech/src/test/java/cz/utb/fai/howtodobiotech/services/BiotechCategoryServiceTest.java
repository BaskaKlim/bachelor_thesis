package cz.utb.fai.howtodobiotech.services;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.repositories.categories.BiotechCategoryRepository;
import cz.utb.fai.howtodobiotech.services.categories.BiotechCategoryService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
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

class BiotechCategoryServiceTest {

    @Mock
    private BiotechCategoryRepository biotechCategoryRepository;

    @InjectMocks
    private BiotechCategoryService biotechCategoryService;

    private BiotechCategory category1;
    private BiotechCategory category2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        category1 = new BiotechCategory();
        category1.setId(1);
        category1.setName(EBiotechCategory.MARINE);

        category2 = new BiotechCategory();
        category2.setId(2);
        category2.setName(EBiotechCategory.ENERGY);
    }

    @Test
    void testGetAllCategories() {

        List<BiotechCategory> categories = Arrays.asList(category1, category2);
        when(biotechCategoryRepository.findAll()).thenReturn(categories);
        List<BiotechCategory> result = biotechCategoryService.getAllCategories();

        assertEquals(2, result.size());
        assertEquals(category1, result.get(0));
        assertEquals(category2, result.get(1));
        verify(biotechCategoryRepository, times(1)).findAll();
    }

    @Test
    void testGetCategoryByName() {

        String categoryName = EBiotechCategory.MARINE.name();
        when(biotechCategoryRepository.findByName(categoryName)).thenReturn(Optional.of(category1));
        Optional<BiotechCategory> result = biotechCategoryService.getCategoryByName(categoryName);

        assertTrue(result.isPresent());
        assertEquals(category1, result.get());
        verify(biotechCategoryRepository, times(1)).findByName(categoryName);
    }

    @Test
    void testGetCategoryById() {
        int categoryId = 3;

        when(biotechCategoryRepository.findById(categoryId)).thenReturn(Optional.of(category2));
        Optional<BiotechCategory> result = biotechCategoryService.getCategoryById(categoryId);

        assertTrue(result.isPresent());
        assertEquals(category2, result.get());
        verify(biotechCategoryRepository, times(1)).findById(categoryId);
    }

    @Test
    void testGetCategoryByName_NonExistingCategory() {
        String categoryName = "dummy";
        when(biotechCategoryRepository.findByName(categoryName)).thenReturn(Optional.empty());

        Optional<BiotechCategory> result = biotechCategoryService.getCategoryByName(categoryName);

        assertFalse(result.isPresent());
        verify(biotechCategoryRepository, times(1)).findByName(categoryName);
    }

}
