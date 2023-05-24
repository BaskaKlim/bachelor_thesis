package cz.utb.fai.howtodobiotech.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import cz.utb.fai.howtodobiotech.api.content.InnovationController;
import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.services.content.InnovationService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;


import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class InnovationControllerTest {
    @Mock
    private InnovationService innovationService;

    @InjectMocks
    private InnovationController innovationController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper = new ObjectMapper();


    @Test
    void testGetInnovationById() {
        int innovationId = 1;
        Innovation innovation = new Innovation();
        innovation.setId(innovationId);
        Optional<Innovation> innovationData = Optional.of(innovation);
        when(innovationService.selectInnovationById(innovationId)).thenReturn(innovationData);

        ResponseEntity<Innovation> response = innovationController.getInnovationById(innovationId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(innovationData.get(), response.getBody());
    }

    @Test
    void testGetAllInnovations() {
        Innovation innovation1 = new Innovation();
        Innovation innovation2 = new Innovation();
        List<Innovation> innovations = new ArrayList<>();
        innovations.add(innovation1);
        innovations.add(innovation2);
        when(innovationService.selectAllInnovations()).thenReturn(innovations);

        ResponseEntity<List<Innovation>> response = innovationController.getAllInnovations();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(innovations, response.getBody());
    }
    @Test
    void testGetInnovationByBiotechCategory() {
        EBiotechCategory biotechCategory = EBiotechCategory.AGRICULTURE;
        List<Innovation> innovations = new ArrayList<>();
        // Add innovations to the list
        innovations.add(new Innovation()); // Add one or more innovations to the list

        when(innovationService.selectInnovationByBiotechCategory(biotechCategory)).thenReturn(innovations);

        ResponseEntity<List<Innovation>> response = innovationController.getInnovationByBiotechCategory(biotechCategory);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(innovations, response.getBody());
    }

    @Test
    void testGetInnovationByCountry() {
        ECountry countryName = ECountry.CEE;
        List<Innovation> innovations = new ArrayList<>();
        innovations.add(new Innovation());

        when(innovationService.selectInnovationByCountry(countryName)).thenReturn(innovations);

        ResponseEntity<List<Innovation>> response = innovationController.getInnovationByCountry(countryName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(innovations, response.getBody());
    }

    @Test
    void testGetInnovationOptByTitle() {
        String title = "Some Title";
        Innovation innovation = new Innovation();
        Optional<Innovation> innovationData = Optional.of(innovation);
        when(innovationService.selectInnovationByTitle(title)).thenReturn(innovationData);

        ResponseEntity<Innovation> response = innovationController.getInnovationOptByTitle(title);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(innovationData.get(), response.getBody());
    }

    private Innovation prepareInnovation() {
        Innovation innovation = new Innovation();
        innovation.setTitle("Some Title");
        innovation.setDescription("Some Description");
        innovation.setWebsite("http://example.com");
        return innovation;
    }
}
