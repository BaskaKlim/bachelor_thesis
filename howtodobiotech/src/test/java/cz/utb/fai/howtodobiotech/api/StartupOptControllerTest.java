package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.api.content.StartupOptController;
import cz.utb.fai.howtodobiotech.models.content.StartupOpt;
import cz.utb.fai.howtodobiotech.services.content.StartupOptService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.ESupportCategory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StartupOptControllerTest {
    @Mock
    private StartupOptService startupOptService;

    @InjectMocks
    private StartupOptController startupOptController;

    private MockMvc mockMvc;

    @Test
    void testGetStartupOptById() {
        int startupOptId = 1;
        StartupOpt startupOpt = new StartupOpt();
        startupOpt.setId(startupOptId);
        Optional<StartupOpt> startupOptData = Optional.of(startupOpt);

        when(startupOptService.selectStartupOptById(startupOptId)).thenReturn(startupOptData);

        ResponseEntity<StartupOpt> response = startupOptController.getStartupOptById(startupOptId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(startupOptData.get(), response.getBody());
    }

    @Test
    void testGetAllStartupOpts() {
        List<StartupOpt> startupOpts = new ArrayList<>();
        startupOpts.add(new StartupOpt());
        startupOpts.add(new StartupOpt());

        when(startupOptService.selectAllStartupOpts()).thenReturn(startupOpts);

        ResponseEntity<List<StartupOpt>> response = startupOptController.getAllStartupOpts();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(startupOpts, response.getBody());
    }

    @Test
    void testGetStartupOptByBiotechCategory() {
        EBiotechCategory biotechCategoryName = EBiotechCategory.AGRICULTURE;
        List<StartupOpt> startupOpts = new ArrayList<>();
        startupOpts.add(new StartupOpt());
        startupOpts.add(new StartupOpt());

        when(startupOptService.selectStartupOptByBiotechCategory(biotechCategoryName)).thenReturn(startupOpts);

        ResponseEntity<List<StartupOpt>> response = startupOptController.getStartupOptByBiotechCategory(biotechCategoryName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(startupOpts, response.getBody());
    }

    @Test
    void testGetStartupOptBySupportCategory() {
        ESupportCategory supportCategoryName = ESupportCategory.INVESTMENT;
        List<StartupOpt> startupOpts = new ArrayList<>();
        startupOpts.add(new StartupOpt());
        startupOpts.add(new StartupOpt());

        when(startupOptService.selectStartupOptBySupportCategory(supportCategoryName)).thenReturn(startupOpts);

        ResponseEntity<List<StartupOpt>> response = startupOptController.getStartupOptBySupportCategory(supportCategoryName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(startupOpts, response.getBody());
    }

    @Test
    void testGetStartupOptByCountry() {
        ECountry countryName = ECountry.CZECHIA;
        List<StartupOpt> startupOpts = new ArrayList<>();
        startupOpts.add(new StartupOpt());
        startupOpts.add(new StartupOpt());

        when(startupOptService.selectInnovationByCountry(countryName)).thenReturn(startupOpts);

        ResponseEntity<List<StartupOpt>> response = startupOptController.getInnovationByCountry(countryName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(startupOpts, response.getBody());
    }

    @Test
    void testGetStartupOptByTitle() {
        String title = "Sample Startup Opportunity";
        StartupOpt startupOpt = new StartupOpt();
        startupOpt.setTitle(title);
        Optional<StartupOpt> startupOptData = Optional.of(startupOpt);

        when(startupOptService.selectStartupOptByTitle(title)).thenReturn(startupOptData);

        ResponseEntity<StartupOpt> response = startupOptController.getStartupOptByTitle(title);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(startupOptData.get(), response.getBody());
    }


    @Test
    void testUpdateStartupOpt() {
        Integer id = 1;
        StartupOpt request = new StartupOpt();
        request.setTitle("Updated Startup Opportunity");

        doNothing().when(startupOptService).updateStartupOpt(id, request);

        ResponseEntity<?> response = startupOptController.updateStartupOpt(id, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(startupOptService, times(1)).updateStartupOpt(id, request);
    }

}
