package cz.utb.fai.howtodobiotech.services;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.SkillCategory;
import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.repositories.content.SkillOptRepository;
import cz.utb.fai.howtodobiotech.services.content.SkillOptService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.ESkillCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.webjars.NotFoundException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SkillOptServiceTest {

    @Mock
    private SkillOptRepository skillOptRepository;

    @InjectMocks
    private SkillOptService skillOptService;

    private SkillOpt skillOpt1;
    private SkillOpt skillOpt2;
    private Country country;
    private BiotechCategory biotechCategory;
    private SkillCategory skillCategory;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        skillOpt1 = new SkillOpt();
        skillOpt1.setId(1);
        skillOpt1.setTitle("Skill Opportunity 1");
        skillOpt1.setOrganizer("Organizer 1");
        skillOpt1.setDescription("Description 1");
        skillOpt1.setStartDate(new Date());
        skillOpt1.setEndDate(new Date());
        skillOpt1.setWebsite("https://www.example.com/1");

        skillOpt2 = new SkillOpt();
        skillOpt2.setId(2);
        skillOpt2.setTitle("Skill Opportunity 2");
        skillOpt2.setOrganizer("Organizer 2");
        skillOpt2.setDescription("Description 2");
        skillOpt2.setStartDate(new Date());
        skillOpt2.setEndDate(new Date());
        skillOpt2.setWebsite("https://www.example.com/2");

        country = new Country();
        country.setId(1);
        country.setName(ECountry.UKRAINE);

        biotechCategory = new BiotechCategory();
        biotechCategory.setId(1);
        biotechCategory.setName(EBiotechCategory.BIOINFORMATICS);

        skillCategory = new SkillCategory();
        skillCategory.setId(1);
        skillCategory.setName(ESkillCategory.INTERNSHIP);
    }

    @Test
    void testSelectSkillOptById_ExistingSkillOpt() {
        int skillOptId = 1;
        when(skillOptRepository.findById(skillOptId)).thenReturn(Optional.of(skillOpt1));
        Optional<SkillOpt> result = skillOptService.selectSkillOptById(skillOptId);

        assertTrue(result.isPresent());
        assertEquals(skillOpt1, result.get());
        verify(skillOptRepository, times(1)).findById(skillOptId);
    }

    @Test
    void testSelectSkillOptById_NonExistingSkillOpt() {
        int skillOptId = 3;
        when(skillOptRepository.findById(skillOptId)).thenReturn(Optional.empty());

        Optional<SkillOpt> result = skillOptService.selectSkillOptById(skillOptId);
        assertFalse(result.isPresent());
        verify(skillOptRepository, times(1)).findById(skillOptId);
    }

    @Test
    void testSelectAllSkillOpts() {
        List<SkillOpt> skillOpts = Arrays.asList(skillOpt1, skillOpt2);
        when(skillOptRepository.findAllWithDetails()).thenReturn(skillOpts);
        List<SkillOpt> result = skillOptService.selectAllSkillOpts();

        assertEquals(2, result.size());
        assertEquals(skillOpts, result);
        verify(skillOptRepository, times(1)).findAllWithDetails();
    }

    @Test
    void testInsertSkillOpt() {
        SkillOpt skillOpt = new SkillOpt();
        skillOpt.setId(3);

        when(skillOptRepository.save(skillOpt)).thenReturn(skillOpt);
        SkillOpt result = skillOptService.insertSkillOpt(skillOpt);
        assertNotNull(result);
        assertEquals(skillOpt.getId(), result.getId());
        verify(skillOptRepository, times(1)).save(skillOpt);
    }

    @Test
    void testUpdateSkillOpt_ExistingSkillOpt() {
        int skillOptId = 1;
        SkillOpt skillOptDto = new SkillOpt();
        skillOptDto.setTitle("Updated Skill Opportunity 1");
        skillOptDto.setOrganizer("Updated Organizer 1");
        skillOptDto.setDescription("Updated Description 1");
        skillOptDto.setStartDate(new Date());
        skillOptDto.setEndDate(new Date());
        skillOptDto.setWebsite("https://www.example.com/updated-1");
        skillOptDto.setCountries(Collections.singleton(country));
        skillOptDto.setBiotechCategories(Collections.singleton(biotechCategory));
        skillOptDto.setSkillCategories(Collections.singleton(skillCategory));

        when(skillOptRepository.findById(skillOptId)).thenReturn(Optional.of(skillOpt1));
        when(skillOptRepository.save(skillOpt1)).thenReturn(skillOpt1);

        assertDoesNotThrow(() -> skillOptService.updateSkillOpt(skillOptId, skillOptDto));
        assertEquals(skillOptDto.getTitle(), skillOpt1.getTitle());
        assertEquals(skillOptDto.getOrganizer(), skillOpt1.getOrganizer());
        assertEquals(skillOptDto.getDescription(), skillOpt1.getDescription());
        assertEquals(skillOptDto.getStartDate(), skillOpt1.getStartDate());
        assertEquals(skillOptDto.getEndDate(), skillOpt1.getEndDate());
        assertEquals(skillOptDto.getWebsite(), skillOpt1.getWebsite());
        assertEquals(skillOptDto.getCountries(), skillOpt1.getCountries());
        assertEquals(skillOptDto.getBiotechCategories(), skillOpt1.getBiotechCategories());
        assertEquals(skillOptDto.getSkillCategories(), skillOpt1.getSkillCategories());
        verify(skillOptRepository, times(1)).findById(skillOptId);
        verify(skillOptRepository, times(1)).save(skillOpt1);
    }

    @Test
    void testUpdateSkillOpt_NonExistingSkillOpt() {
        int skillOptId = 3;
        SkillOpt skillOptDto = new SkillOpt();
        when(skillOptRepository.findById(skillOptId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> skillOptService.updateSkillOpt(skillOptId, skillOptDto));
        verify(skillOptRepository, times(1)).findById(skillOptId);
        verify(skillOptRepository, never()).save(any(SkillOpt.class));
    }

    @Test
    void testDeleteSkillOptById() {
        int skillOptId = 1;
        assertDoesNotThrow(() -> skillOptService.deleteSkillOptById(skillOptId));

        verify(skillOptRepository, times(1)).deleteById(skillOptId);
    }

    @Test
    void testSelectSkillOptByBiotechCategory() {
        EBiotechCategory biotechCategoryName = EBiotechCategory.BIOINFORMATICS;
        List<SkillOpt> skillOpts = Arrays.asList(skillOpt1, skillOpt2);
        when(skillOptRepository.findByBiotechCategoryName(biotechCategoryName)).thenReturn(skillOpts);
        List<SkillOpt> result = skillOptService.selectSkillOptByBiotechCategory(biotechCategoryName);

        assertEquals(2, result.size());
        assertEquals(skillOpts, result);
        verify(skillOptRepository, times(1)).findByBiotechCategoryName(biotechCategoryName);
    }

    @Test
    void testSelectSkillOptBySkillCategory() {
        ESkillCategory skillCategoryName = ESkillCategory.INTERNSHIP;
        List<SkillOpt> skillOpts = Arrays.asList(skillOpt1, skillOpt2);
        when(skillOptRepository.findBySkillCategoryName(skillCategoryName)).thenReturn(skillOpts);
        List<SkillOpt> result = skillOptService.selectSkillOptBySkillCategory(skillCategoryName);

        assertEquals(2, result.size());
        assertEquals(skillOpts, result);
        verify(skillOptRepository, times(1)).findBySkillCategoryName(skillCategoryName);
    }

    @Test
    void testSelectSkillOptByCountry() {
        ECountry countryName = ECountry.UKRAINE;
        List<SkillOpt> skillOpts = Arrays.asList(skillOpt1, skillOpt2);
        when(skillOptRepository.findByCountryName(countryName)).thenReturn(skillOpts);
        List<SkillOpt> result = skillOptService.selectSkillOptByCountry(countryName);

        assertEquals(2, result.size());
        assertEquals(skillOpts, result);
        verify(skillOptRepository, times(1)).findByCountryName(countryName);
    }

    @Test
    void testSelectSkillOptByAccountId() {
        int accountId = 1;
        List<SkillOpt> skillOpts = Arrays.asList(skillOpt1, skillOpt2);
        when(skillOptRepository.findByAccountId(accountId)).thenReturn(skillOpts);
        List<SkillOpt> result = skillOptService.selectSkillOptByAccountId(accountId);

        assertEquals(2, result.size());
        assertEquals(skillOpts, result);
        verify(skillOptRepository, times(1)).findByAccountId(accountId);
    }

    @Test
    void testSelectSkillOptByTitle_ExistingSkillOpt() {
        String title = "Summer School of Biology";
        when(skillOptRepository.findByTitle(title)).thenReturn(Optional.of(skillOpt1));
        Optional<SkillOpt> result = skillOptService.selectSkillOptByTitle(title);

        assertTrue(result.isPresent());
        assertEquals(skillOpt1, result.get());
        verify(skillOptRepository, times(1)).findByTitle(title);
    }

    @Test
    void testSelectSkillOptByTitle_NonExistingSkillOpt() {
        String title = "dummy";
        when(skillOptRepository.findByTitle(title)).thenReturn(Optional.empty());
        Optional<SkillOpt> result = skillOptService.selectSkillOptByTitle(title);

        assertFalse(result.isPresent());
        verify(skillOptRepository, times(1)).findByTitle(title);
    }

    @Test
    void testSelectSkillOptByOrganizer_ExistingSkillOpt() {
        String organizer = "Organizer 1";
        when(skillOptRepository.findByOrganizer(organizer)).thenReturn(Optional.of(skillOpt1));
        Optional<SkillOpt> result = skillOptService.selectSkillOptByOrganizer(organizer);

        assertTrue(result.isPresent());
        assertEquals(skillOpt1, result.get());
        verify(skillOptRepository, times(1)).findByOrganizer(organizer);
    }

    @Test
    void testSelectSkillOptByOrganizer_NonExistingSkillOpt() {
        String organizer = "dummy";
        when(skillOptRepository.findByOrganizer(organizer)).thenReturn(Optional.empty());
        Optional<SkillOpt> result = skillOptService.selectSkillOptByOrganizer(organizer);

        // Assert
        assertFalse(result.isPresent());
        verify(skillOptRepository, times(1)).findByOrganizer(organizer);
    }

    @Test
    void testSelectSkillOptByStartDate_ExistingSkillOpt() {
        Date startDate = new Date();
        when(skillOptRepository.findByStartDate(startDate)).thenReturn(Optional.of(skillOpt1));
        Optional<SkillOpt> result = skillOptService.selectSkillOptByStartDate(startDate);

        assertTrue(result.isPresent());
        assertEquals(skillOpt1, result.get());
        verify(skillOptRepository, times(1)).findByStartDate(startDate);
    }

    @Test
    void testSelectSkillOptByStartDate_NonExistingSkillOpt() {
        Date startDate = new Date();
        when(skillOptRepository.findByStartDate(startDate)).thenReturn(Optional.empty());
        Optional<SkillOpt> result = skillOptService.selectSkillOptByStartDate(startDate);

        assertFalse(result.isPresent());
        verify(skillOptRepository, times(1)).findByStartDate(startDate);
    }

    @Test
    void testSelectSkillOptByEndDate_ExistingSkillOpt() {
        Date endDate = new Date();
        when(skillOptRepository.findByEndDate(endDate)).thenReturn(Optional.of(skillOpt1));
        Optional<SkillOpt> result = skillOptService.selectSkillOptByEndDate(endDate);

        assertTrue(result.isPresent());
        assertEquals(skillOpt1, result.get());
        verify(skillOptRepository, times(1)).findByEndDate(endDate);
    }

    @Test
    void testSelectSkillOptByEndDate_NonExistingSkillOpt() {
        Date endDate = new Date();
        when(skillOptRepository.findByEndDate(endDate)).thenReturn(Optional.empty());
        Optional<SkillOpt> result = skillOptService.selectSkillOptByEndDate(endDate);

        assertFalse(result.isPresent());
        verify(skillOptRepository, times(1)).findByEndDate(endDate);
    }
}
