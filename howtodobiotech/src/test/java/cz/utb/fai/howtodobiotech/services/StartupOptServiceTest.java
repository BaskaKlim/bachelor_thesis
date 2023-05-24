package cz.utb.fai.howtodobiotech.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import cz.utb.fai.howtodobiotech.models.content.StartupOpt;
import cz.utb.fai.howtodobiotech.repositories.content.StartupOptRepository;
import cz.utb.fai.howtodobiotech.services.content.StartupOptService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.ESupportCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.webjars.NotFoundException;

import java.util.*;

public class StartupOptServiceTest {
    @Mock

    private StartupOptRepository startupOptRepository;

    @InjectMocks
    private StartupOptService startupOptService;

    private StartupOpt startupOpt1;
    private StartupOpt startupOpt2;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        Country country1 = new Country(12, ECountry.CEE);
        Country country2 = new Country(9, ECountry.SLOVAKIA);

        BiotechCategory biotechCategory1 = new BiotechCategory(1, EBiotechCategory.MEDICINE);
        BiotechCategory biotechCategory2 = new BiotechCategory(2, EBiotechCategory.BIOINFORMATICS);

        StartupSupportCategory supportCategory1 = new StartupSupportCategory(1, ESupportCategory.INCUBATOR);
        StartupSupportCategory supportCategory2 = new StartupSupportCategory(2, ESupportCategory.INVESTMENT);

        startupOpt1 = new StartupOpt();
        startupOpt1.setId(1);
        startupOpt1.setTitle(" Impact Incubator");
        startupOpt1.setProvider("Impact HUB");
        startupOpt1.setDescription("Description 1");
        startupOpt1.setStartDate(new Date());
        startupOpt1.setEndDate(new Date());
        startupOpt1.setWebsite("Website 1");
        startupOpt1.setAccountId(1);
        startupOpt1.setCountries(new HashSet<>(Arrays.asList(country1, country2)));
        startupOpt1.setBiotechCategories(new HashSet<>(Arrays.asList(biotechCategory1, biotechCategory2)));
        startupOpt1.setSupportCategories(new HashSet<>(Arrays.asList(supportCategory1, supportCategory2)));

        startupOpt2 = new StartupOpt();
        startupOpt2.setId(2);
        startupOpt2.setTitle("Challenger CIVITTA");
        startupOpt2.setProvider("CIVITTA");
        startupOpt2.setDescription("Description 2");
        startupOpt2.setStartDate(new Date());
        startupOpt2.setEndDate(new Date());
        startupOpt2.setWebsite("Website 2");
        startupOpt2.setAccountId(2);
        startupOpt2.setCountries(new HashSet<>(Arrays.asList(country1)));
        startupOpt2.setBiotechCategories(new HashSet<>(Arrays.asList(biotechCategory1)));
        startupOpt2.setSupportCategories(new HashSet<>(Arrays.asList(supportCategory1)));
    }

    @Test
    void testSelectStartupOptById_ExistingStartupOpt() {
        int id = 1;

        when(startupOptRepository.findById(id)).thenReturn(Optional.of(startupOpt1));
        Optional<StartupOpt> result = startupOptService.selectStartupOptById(id);

        assertTrue(result.isPresent());
        assertEquals(startupOpt1, result.get());
        verify(startupOptRepository, times(1)).findById(id);
    }

    @Test
    void testSelectStartupOptById_NonExistingStartupOpt() {
        int id = 999;
        when(startupOptRepository.findById(id)).thenReturn(Optional.empty());
        Optional<StartupOpt> result = startupOptService.selectStartupOptById(id);

        assertFalse(result.isPresent());
        verify(startupOptRepository, times(1)).findById(id);
    }

    @Test
    void testSelectAllStartupOpts() {
        List<StartupOpt> startupOpts = Arrays.asList(startupOpt1, startupOpt2);
        when(startupOptRepository.findAll()).thenReturn(startupOpts);
        List<StartupOpt> result = startupOptService.selectAllStartupOpts();

        assertEquals(startupOpts.size(), result.size());
        assertTrue(result.contains(startupOpt1));
        assertTrue(result.contains(startupOpt2));
        verify(startupOptRepository, times(1)).findAll();
    }

    @Test
    void testInsertStartupOpt() {
        StartupOpt newStartupOpt = new StartupOpt();
        newStartupOpt.setTitle("New Startup Opportunity");
        when(startupOptRepository.save(newStartupOpt)).thenReturn(newStartupOpt);
        StartupOpt result = startupOptService.insertStartupOpt(newStartupOpt);

        assertNotNull(result);
        assertEquals(newStartupOpt.getTitle(), result.getTitle());
        verify(startupOptRepository, times(1)).save(newStartupOpt);
    }

    @Test
    void testUpdateStartupOpt_ExistingStartupOpt() {
        int id = 1;
        StartupOpt updatedStartupOpt = new StartupOpt();
        updatedStartupOpt.setTitle("Updated Startup Opportunity");

        when(startupOptRepository.findById(id)).thenReturn(Optional.of(startupOpt1));
        when(startupOptRepository.save(startupOpt1)).thenReturn(startupOpt1);

        // Act
        assertDoesNotThrow(() -> startupOptService.updateStartupOpt(id, updatedStartupOpt));

        // Assert
        assertEquals(updatedStartupOpt.getTitle(), startupOpt1.getTitle());
        verify(startupOptRepository, times(1)).findById(id);
        verify(startupOptRepository, times(1)).save(startupOpt1);
    }

    @Test
    void testUpdateStartupOpt_NonExistingStartupOpt() {
        int id = 999;
        StartupOpt updatedStartupOpt = new StartupOpt();
        updatedStartupOpt.setTitle("Updated Startup Opportunity");
        when(startupOptRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> startupOptService.updateStartupOpt(id, updatedStartupOpt));

        verify(startupOptRepository, times(1)).findById(id);
        verify(startupOptRepository, never()).save(any(StartupOpt.class));
    }

    @Test
    void testDeleteStartupOptById_ExistingStartupOpt() {
        // Arrange
        int id = 1;

        // Act
        assertDoesNotThrow(() -> startupOptService.deleteStartupOptById(id));

        // Assert
        verify(startupOptRepository, times(1)).deleteById(id);
    }


    @Test
    void testSelectStartupOptByBiotechCategory() {
        EBiotechCategory biotechCategory = EBiotechCategory.MEDICINE;
        when(startupOptRepository.findByCategoryName(biotechCategory))
                .thenReturn(Arrays.asList(startupOpt1));
        List<StartupOpt> result = startupOptService.selectStartupOptByBiotechCategory(biotechCategory);

        assertEquals(1, result.size());
        assertTrue(result.contains(startupOpt1));
        verify(startupOptRepository, times(1)).findByCategoryName(biotechCategory);
    }

    @Test
    void testSelectStartupOptBySupportCategory() {
        ESupportCategory supportCategory = ESupportCategory.INCUBATOR;
        when(startupOptRepository.findBySupportCategoryName(supportCategory))
                .thenReturn(Arrays.asList(startupOpt1));

        List<StartupOpt> result = startupOptService.selectStartupOptBySupportCategory(supportCategory);

        assertEquals(1, result.size());
        assertTrue(result.contains(startupOpt1));
        verify(startupOptRepository, times(1)).findBySupportCategoryName(supportCategory);
    }

    @Test
    void testSelectStartupOptByCountry() {
        ECountry country = ECountry.CEE;
        when(startupOptRepository.findByCountryName(country))
                .thenReturn(Arrays.asList(startupOpt1));
        List<StartupOpt> result = startupOptService.selectInnovationByCountry(country);

        assertEquals(1, result.size());
        assertTrue(result.contains(startupOpt1));
        verify(startupOptRepository, times(1)).findByCountryName(country);
    }

    @Test
    void testSelectStartupOptByTitle_ExistingStartupOpt() {
        String title = "Startup Opportunity 1";
        when(startupOptRepository.findByTitle(title)).thenReturn(Optional.of(startupOpt1));
        Optional<StartupOpt> result = startupOptService.selectStartupOptByTitle(title);

        assertTrue(result.isPresent());
        assertEquals(startupOpt1, result.get());
        verify(startupOptRepository, times(1)).findByTitle(title);
    }

    @Test
    void testSelectStartupOptByTitle_NonExistingStartupOpt() {
        String title = "Non-existing Startup Opportunity";
        when(startupOptRepository.findByTitle(title)).thenReturn(Optional.empty());
        Optional<StartupOpt> result = startupOptService.selectStartupOptByTitle(title);

        assertFalse(result.isPresent());
        verify(startupOptRepository, times(1)).findByTitle(title);
    }

    @Test
    void testSelectStartupOptByProvider_ExistingStartupOpt() {
        String provider = "Provider 1";
        when(startupOptRepository.findByProvider(provider)).thenReturn(Optional.of(startupOpt1));
        Optional<StartupOpt> result = startupOptService.selectStartupOptByProvider(provider);

        assertTrue(result.isPresent());
        assertEquals(startupOpt1, result.get());
        verify(startupOptRepository, times(1)).findByProvider(provider);
    }

    @Test
    void testSelectStartupOptByProvider_NonExistingStartupOpt() {
        String provider = "dummy";
        when(startupOptRepository.findByProvider(provider)).thenReturn(Optional.empty());
        Optional<StartupOpt> result = startupOptService.selectStartupOptByProvider(provider);

        assertFalse(result.isPresent());
        verify(startupOptRepository, times(1)).findByProvider(provider);
    }

    @Test
    void testSelectStartupOptByStartDate_ExistingStartupOpt() {
        Date startDate = new Date();
        when(startupOptRepository.findByStartDate(startDate)).thenReturn(Optional.of(startupOpt1));
        Optional<StartupOpt> result = startupOptService.selectStartupOptByStartDate(startDate);

        assertTrue(result.isPresent());
        assertEquals(startupOpt1, result.get());
        verify(startupOptRepository, times(1)).findByStartDate(startDate);
    }

    @Test
    void testSelectStartupOptByStartDate_NonExistingStartupOpt() {
        Date startDate = new Date();
        when(startupOptRepository.findByStartDate(startDate)).thenReturn(Optional.empty());
        Optional<StartupOpt> result = startupOptService.selectStartupOptByStartDate(startDate);

        assertFalse(result.isPresent());
        verify(startupOptRepository, times(1)).findByStartDate(startDate);
    }

    @Test
    void testSelectStartupOptByEndDate_ExistingStartupOpt() {
        Date endDate = new Date();
        when(startupOptRepository.findByEndDate(endDate)).thenReturn(Optional.of(startupOpt1));
        Optional<StartupOpt> result = startupOptService.selectStartupOptByEndDate(endDate);

        assertTrue(result.isPresent());
        assertEquals(startupOpt1, result.get());
        verify(startupOptRepository, times(1)).findByEndDate(endDate);
    }

    @Test
    void testSelectStartupOptByEndDate_NonExistingStartupOpt() {
        Date endDate = new Date();

        when(startupOptRepository.findByEndDate(endDate)).thenReturn(Optional.empty());
        Optional<StartupOpt> result = startupOptService.selectStartupOptByEndDate(endDate);

        assertFalse(result.isPresent());
        verify(startupOptRepository, times(1)).findByEndDate(endDate);
    }

    @Test
    void testSelectStartupOptByAccountId() {
        int accountId = 1;

        when(startupOptRepository.findByAccountId(accountId))
                .thenReturn(Arrays.asList(startupOpt1));

        List<StartupOpt> result = startupOptService.selectStartupOptByAccountId(accountId);

        assertEquals(1, result.size());
        assertTrue(result.contains(startupOpt1));
        verify(startupOptRepository, times(1)).findByAccountId(accountId);
    }
}