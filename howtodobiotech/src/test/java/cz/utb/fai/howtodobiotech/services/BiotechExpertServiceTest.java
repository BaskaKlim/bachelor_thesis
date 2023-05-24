package cz.utb.fai.howtodobiotech.services;

import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.ExpertCategory;
import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.repositories.content.BiotechExpertRepository;
import cz.utb.fai.howtodobiotech.services.content.BiotechExpertService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.EExpertCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.webjars.NotFoundException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BiotechExpertServiceTest {

    @Mock
    private BiotechExpertRepository biotechExpertRepository;

    @InjectMocks
    private BiotechExpertService biotechExpertService;

    private BiotechExpert expert1;
    private BiotechExpert expert2;
    private Country country;
    private ExpertCategory expertCategory;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        expert1 = new BiotechExpert();
        expert1.setId(1);
        expert1.setFirstName("John");
        expert1.setLastName("Wick");
        expert1.setEmail("john.wick@example.com");
        expert1.setJobPosition("Biotech Expert");
        expert1.setLinkedinUrl("https://www.linkedin.com/in/wick/");
        expert1.setBackgroundDescription("Some description about John's super skills");

        expert2 = new BiotechExpert();
        expert2.setId(2);
        expert2.setFirstName("Jane");
        expert2.setLastName("Wood");
        expert2.setEmail("jane.wood@example.com");
        expert2.setJobPosition("Biotech Specialist");
        expert2.setLinkedinUrl("https://www.linkedin.com/in/wood/");
        expert2.setBackgroundDescription("Some background description");

        country = new Country();
        country.setId(1);
        country.setName(ECountry.CROATIA);

        expertCategory = new ExpertCategory();
        expertCategory.setId(1);
        expertCategory.setName(EExpertCategory.CHEMISTRY);
    }

    @Test
    void testSelectBiotechExpertById_ExistingExpert() {
        int expertId = 1;
        when(biotechExpertRepository.findById(expertId)).thenReturn(Optional.of(expert1));
        Optional<BiotechExpert> result = biotechExpertService.selectBiotechExpertById(expertId);

        assertTrue(result.isPresent());
        assertEquals(expert1, result.get());
        verify(biotechExpertRepository, times(1)).findById(expertId);
    }

    @Test
    void testSelectBiotechExpertById_NonExistingExpert() {
        int expertId = 3;

        when(biotechExpertRepository.findById(expertId)).thenReturn(Optional.empty());
        Optional<BiotechExpert> result = biotechExpertService.selectBiotechExpertById(expertId);

        assertFalse(result.isPresent());
        verify(biotechExpertRepository, times(1)).findById(expertId);
    }

    @Test
    void testSelectAllBiotechExperts() {
        List<BiotechExpert> experts = Arrays.asList(expert1, expert2);
        when(biotechExpertRepository.findAll()).thenReturn(experts);
        List<BiotechExpert> result = biotechExpertService.selectAllBiotechExperts();

        assertEquals(2, result.size());
        assertEquals(expert1, result.get(0));
        assertEquals(expert2, result.get(1));
        verify(biotechExpertRepository, times(1)).findAll();
    }

    @Test
    void testInsertBiotechExpert() {
        BiotechExpert expert = new BiotechExpert();
        expert.setId(3);
        when(biotechExpertRepository.save(expert)).thenReturn(expert);
        BiotechExpert result = biotechExpertService.insertBiotechExpert(expert);

        assertNotNull(result);
        assertEquals(expert.getId(), result.getId());
        verify(biotechExpertRepository, times(1)).save(expert);
    }

    @Test
    void testUpdateBiotechExpert_ExistingExpert() {
        int expertId = 1;
        BiotechExpert expertDto = new BiotechExpert();
        expertDto.setFirstName("Updated John");
        expertDto.setLastName("Updated Wick");
        expertDto.setEmail("updated.john.wick@example.com");
        expertDto.setJobPosition("Updated Biotech Expert");
        expertDto.setLinkedinUrl("https://www.linkedin.com/in/updatedWick/");
        expertDto.setBackgroundDescription("Updated background description");
        expertDto.setCountries(Collections.singleton(country));
        expertDto.setExpertises(Collections.singleton(expertCategory));

        when(biotechExpertRepository.findById(expertId)).thenReturn(Optional.of(expert1));
        when(biotechExpertRepository.save(expert1)).thenReturn(expert1);

        assertDoesNotThrow(() -> biotechExpertService.updateBiotechExpert(expertId, expertDto));
        assertEquals(expertDto.getFirstName(), expert1.getFirstName());
        assertEquals(expertDto.getLastName(), expert1.getLastName());
        assertEquals(expertDto.getEmail(), expert1.getEmail());
        assertEquals(expertDto.getJobPosition(), expert1.getJobPosition());
        assertEquals(expertDto.getLinkedinUrl(), expert1.getLinkedinUrl());
        assertEquals(expertDto.getBackgroundDescription(), expert1.getBackgroundDescription());
        assertEquals(expertDto.getCountries(), expert1.getCountries());
        assertEquals(expertDto.getExpertises(), expert1.getExpertises());
        verify(biotechExpertRepository, times(1)).findById(expertId);
        verify(biotechExpertRepository, times(1)).save(expert1);
    }

    @Test
    void testUpdateBiotechExpert_NonExistingExpert() {
        int expertId = 3;
        BiotechExpert expertDto = new BiotechExpert();
        when(biotechExpertRepository.findById(expertId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> biotechExpertService.updateBiotechExpert(expertId, expertDto));
        verify(biotechExpertRepository, times(1)).findById(expertId);
        verify(biotechExpertRepository, never()).save(any(BiotechExpert.class));
    }

    @Test
    void testDeleteBiotechExpertById() {
        int expertId = 1;

        assertDoesNotThrow(() -> biotechExpertService.deleteBiotechExpertById(expertId));
        verify(biotechExpertRepository, times(1)).deleteById(expertId);
    }

    @Test
    void testSelectBiotechExpertByLastName_ExistingExpert() {
        String lastName = "Doe";
        when(biotechExpertRepository.findByLastName(lastName)).thenReturn(Optional.of(expert1));
        Optional<BiotechExpert> result = biotechExpertService.selectBiotechExpertByLastName(lastName);

        assertTrue(result.isPresent());
        assertEquals(expert1, result.get());
        verify(biotechExpertRepository, times(1)).findByLastName(lastName);
    }

    @Test
    void testSelectBiotechExpertByLastName_NonExistingExpert() {
        String lastName = "Non-existing";
        when(biotechExpertRepository.findByLastName(lastName)).thenReturn(Optional.empty());
        Optional<BiotechExpert> result = biotechExpertService.selectBiotechExpertByLastName(lastName);

        assertFalse(result.isPresent());
        verify(biotechExpertRepository, times(1)).findByLastName(lastName);
    }

    @Test
    void testSelectBiotechExpertByExpertise() {
        EExpertCategory expertiseName = EExpertCategory.CHEMISTRY;
        List<BiotechExpert> experts = Arrays.asList(expert1, expert2);
        when(biotechExpertRepository.findByExpertiseName(expertiseName)).thenReturn(experts);
        List<BiotechExpert> result = biotechExpertService.selectBiotechExpertByExpertise(expertiseName);

        assertEquals(2, result.size());
        assertEquals(experts, result);
        verify(biotechExpertRepository, times(1)).findByExpertiseName(expertiseName);
    }

    @Test
    void testSelectBiotechExpertByCountry() {
        ECountry countryName = ECountry.CROATIA;
        List<BiotechExpert> experts = Arrays.asList(expert1, expert2);
        when(biotechExpertRepository.findByCountryName(countryName)).thenReturn(experts);
        List<BiotechExpert> result = biotechExpertService.selectBiotechExpertByCountry(countryName);

        assertEquals(2, result.size());
        assertEquals(experts, result);
        verify(biotechExpertRepository, times(1)).findByCountryName(countryName);
    }
}
