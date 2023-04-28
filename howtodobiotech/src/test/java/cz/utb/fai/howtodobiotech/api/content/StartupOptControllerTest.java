package cz.utb.fai.howtodobiotech.api.content;

import java.time.Instant;
import java.util.*;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import cz.utb.fai.howtodobiotech.models.content.StartupOpt;
import cz.utb.fai.howtodobiotech.services.content.StartupOptService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.ESupportCategory;
import org.joda.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class StartupOptControllerTest {

    @Mock
    StartupOptService startupOptService;

    @InjectMocks
    StartupOptController startupOptController;


    private StartupOpt startupOpt;
    private List<StartupOpt> startupOptList;


    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        Set<BiotechCategory> categorySet = new HashSet<>();
        BiotechCategory category1 = new BiotechCategory(1, EBiotechCategory.Energy);
        BiotechCategory category2 = new BiotechCategory(2, EBiotechCategory.Marine);
        categorySet.add(category1);
        categorySet.add(category2);

        Set<StartupSupportCategory> supportCategories = new HashSet<>();
        StartupSupportCategory category3 = new StartupSupportCategory(1, ESupportCategory.INVESTMENT);
        StartupSupportCategory category4 = new StartupSupportCategory(2, ESupportCategory.MENTORING);
        supportCategories.add(category3);
        supportCategories.add(category4);

        startupOpt = new StartupOpt();
        startupOpt.setId(1);
        startupOpt.setTitle("Title");
        startupOpt.setWebsite("www.example.sk");
        startupOpt.setDescription("Description of Skill Opportunity");
        startupOpt.setProvider("Provider");
        startupOpt.setStartDate(LocalDate.now().toDate());
        startupOpt.setEndDate(LocalDate.now().toDate());
        startupOpt.setCountry( new Country(9, ECountry.Slovakia) );
        startupOpt.setCategories(categorySet);
        startupOpt.setSupportCategories(supportCategories);
        startupOptList = new ArrayList<>();
        startupOptList.add(startupOpt);
    }

    @Test
    void testGetAllStartupOpts() {
        when(startupOptService.getAllStartupOpts()).thenReturn(startupOptList);

        // Call the controller's getAllStartupOpts() method
        ResponseEntity<List<StartupOpt>> response = startupOptController.getAllStartupOpts();

        // Verify that the response contains the startup opportunities
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<StartupOpt> responseStartupOpts = response.getBody();
        assertNotNull(responseStartupOpts);
        assertEquals(1, responseStartupOpts.size());
        assertEquals(startupOptList.get(0), responseStartupOpts.get(0));
    }

    @Test
    void testGetStartupOptById() {
        // Create a startup opportunity to return from the service
        when(startupOptService.getStartupOptById(1)).thenReturn(Optional.of(startupOpt));

        // Call the controller's getStartupOptById() method
        ResponseEntity<StartupOpt> response = startupOptController.selectStartupOptById(1);

        // Verify that the response contains the startup opportunity
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        StartupOpt responseStartupOpt = response.getBody();
        assertNotNull(responseStartupOpt);
        assertEquals(startupOpt, responseStartupOpt);
    }

    @Test
    public void testCreateStartupOpt() {
        when(startupOptService.addSStartupOpt(any(StartupOpt.class))).thenReturn(startupOpt);
        ResponseEntity<StartupOpt> responseEntity = startupOptController.createStartupOpt(startupOpt);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        StartupOpt result = responseEntity.getBody();
        assertNotNull(result);
        assertEquals(startupOpt.getId(), result.getId());
        assertEquals(startupOpt.getTitle(), result.getTitle());
        assertEquals(startupOpt.getProvider(), result.getProvider());
        assertEquals(startupOpt.getDescription(), result.getDescription());
        assertEquals(startupOpt.getStartDate(), result.getStartDate());
        assertEquals(startupOpt.getEndDate(), result.getEndDate());
        assertEquals(startupOpt.getWebsite(), result.getWebsite());
        assertEquals(startupOpt.getCategories(), result.getCategories());
        assertEquals(startupOpt.getSupportCategories(), result.getSupportCategories());
    }

/*
    @Test
    public void testDeleteStartupOpt() {
       when(startupOptService.addSStartupOpt(any())).thenReturn(startupOpt);
       when(startupOptService.getStartupOptById(any())).thenReturn(Optional.ofNullable(startupOpt));
        assertTrue(startupOptService.getStartupOptById(startupOpt.getId()).isPresent());
        startupOptController.deleteStartupOpt(startupOpt.getId());
        assertFalse(startupOptService.getStartupOptById(startupOpt.getId()).isPresent());
    }

*/
}

