package cz.utb.fai.howtodobiotech.services;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.repositories.content.InnovationRepository;
import cz.utb.fai.howtodobiotech.services.content.InnovationService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.webjars.NotFoundException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InnovationServiceTest {

    @Mock
    private InnovationRepository innovationRepository;

    @InjectMocks
    private InnovationService innovationService;

    private Innovation innovation1;
    private Innovation innovation2;
    private Country country;
    private BiotechCategory biotechCategory;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        innovation1 = new Innovation();
        innovation1.setId(1);
        innovation1.setTitle("Sensoneo");
        innovation1.setDescription("Description 1");
        innovation1.setWebsite("https://www.example.com/sensoneo");

        innovation2 = new Innovation();
        innovation2.setId(2);
        innovation2.setTitle("Innogy");
        innovation2.setDescription("Description 2");
        innovation2.setWebsite("https://www.example.com/Innogy");

        country = new Country();
        country.setId(1);
        country.setName(ECountry.ESTONIA);

        biotechCategory = new BiotechCategory();
        biotechCategory.setId(1);
        biotechCategory.setName(EBiotechCategory.ENVIRONMENTAL);
    }

    @Test
    void testSelectInnovationById_ExistingInnovation() {
        int innovationId = 1;
        when(innovationRepository.findById(innovationId)).thenReturn(Optional.of(innovation1));
        Optional<Innovation> result = innovationService.selectInnovationById(innovationId);

        assertTrue(result.isPresent());
        assertEquals(innovation1, result.get());
        verify(innovationRepository, times(1)).findById(innovationId);
    }

    @Test
    void testSelectInnovationById_NonExistingInnovation() {
        int innovationId = 3;
        when(innovationRepository.findById(innovationId)).thenReturn(Optional.empty());
        Optional<Innovation> result = innovationService.selectInnovationById(innovationId);

        assertFalse(result.isPresent());
        verify(innovationRepository, times(1)).findById(innovationId);
    }

    @Test
    void testSelectAllInnovations() {
        List<Innovation> innovations = Arrays.asList(innovation1, innovation2);
        when(innovationRepository.findAll()).thenReturn(innovations);

        List<Innovation> result = innovationService.selectAllInnovations();
        assertEquals(2, result.size());
        assertEquals(innovation1, result.get(0));
        assertEquals(innovation2, result.get(1));
        verify(innovationRepository, times(1)).findAll();
    }

    @Test
    void testInsertInnovation() {
        Innovation innovation = new Innovation();
        innovation.setId(3);
        when(innovationRepository.save(innovation)).thenReturn(innovation);

        Innovation result = innovationService.insertInnovation(innovation);

        assertNotNull(result);
        assertEquals(innovation.getId(), result.getId());
        verify(innovationRepository, times(1)).save(innovation);
    }

    @Test
    void testUpdateInnovation_ExistingInnovation() {
        int innovationId = 1;
        Innovation innovationDto = new Innovation();
        innovationDto.setTitle("Updated Innovation 1");
        innovationDto.setDescription("Updated Description 1");
        innovationDto.setWebsite("https://www.example.com/updated-1");
        innovationDto.setCountries(Collections.singleton(country));
        innovationDto.setCategories(Collections.singleton(biotechCategory));

        when(innovationRepository.findById(innovationId)).thenReturn(Optional.of(innovation1));
        when(innovationRepository.save(innovation1)).thenReturn(innovation1);
        assertDoesNotThrow(() -> innovationService.updateInnovation(innovationId, innovationDto));

        assertEquals(innovationDto.getTitle(), innovation1.getTitle());
        assertEquals(innovationDto.getDescription(), innovation1.getDescription());
        assertEquals(innovationDto.getWebsite(), innovation1.getWebsite());
        assertEquals(innovationDto.getCountries(), innovation1.getCountries());
        assertEquals(innovationDto.getCategories(), innovation1.getCategories());
        verify(innovationRepository, times(1)).findById(innovationId);
        verify(innovationRepository, times(1)).save(innovation1);
    }

    @Test
    void testUpdateInnovation_NonExistingInnovation() {
        int innovationId = 3;
        Innovation innovationDto = new Innovation();

        when(innovationRepository.findById(innovationId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> innovationService.updateInnovation(innovationId, innovationDto));
        verify(innovationRepository, times(1)).findById(innovationId);
        verify(innovationRepository, never()).save(any(Innovation.class));
    }

    @Test
    void testDeleteInnovationById() {
        int innovationId = 1;
        assertDoesNotThrow(() -> innovationService.deleteInnovationById(innovationId));

        verify(innovationRepository, times(1)).deleteById(innovationId);
    }

    @Test
    void testSelectInnovationByBiotechCategory() {
        EBiotechCategory biotechCategoryName = EBiotechCategory.ENVIRONMENTAL;
        List<Innovation> innovations = Arrays.asList(innovation1, innovation2);
        when(innovationRepository.findByCategoryName(biotechCategoryName)).thenReturn(innovations);
        List<Innovation> result = innovationService.selectInnovationByBiotechCategory(biotechCategoryName);

        assertEquals(2, result.size());
        assertEquals(innovations, result);
        verify(innovationRepository, times(1)).findByCategoryName(biotechCategoryName);
    }

    @Test
    void testSelectInnovationByCountry() {
        ECountry countryName = ECountry.ESTONIA;
        List<Innovation> innovations = Arrays.asList(innovation1, innovation2);
        when(innovationRepository.findByCountryName(countryName)).thenReturn(innovations);
        List<Innovation> result = innovationService.selectInnovationByCountry(countryName);

        assertEquals(2, result.size());
        assertEquals(innovations, result);
        verify(innovationRepository, times(1)).findByCountryName(countryName);
    }

    @Test
    void testSelectInnovationByTitle_ExistingInnovation() {
        String title = "Innovation 1";
        when(innovationRepository.findByTitle(title)).thenReturn(Optional.of(innovation1));
        Optional<Innovation> result = innovationService.selectInnovationByTitle(title);

        assertTrue(result.isPresent());
        assertEquals(innovation1, result.get());
        verify(innovationRepository, times(1)).findByTitle(title);
    }

    @Test
    void testSelectInnovationByTitle_NonExistingInnovation() {
        String title = "Non-existing";
        when(innovationRepository.findByTitle(title)).thenReturn(Optional.empty());
        Optional<Innovation> result = innovationService.selectInnovationByTitle(title);

        assertFalse(result.isPresent());
        verify(innovationRepository, times(1)).findByTitle(title);
    }
}