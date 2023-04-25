package cz.utb.fai.howtodobiotech.api.content;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.services.content.InnovationService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class InnovationControllerTest {

    @Mock
    private InnovationService innovationService;

    @InjectMocks
    private InnovationController innovationController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Test selectInnovationById() method with valid ID")
    void testSelectInnovationByIdValid() {
        Set<BiotechCategory> categorySet = new HashSet<>();
        BiotechCategory category1 = new BiotechCategory(1, EBiotechCategory.Industry_WHITE);
        BiotechCategory category2 = new BiotechCategory(2, EBiotechCategory.Marine_BLUE);
        categorySet.add(category1);
        categorySet.add(category2);
        int innovationId = 1;
        Innovation innovation = new Innovation(innovationId, "Title", "Description", "Website", categorySet);
        when(innovationService.getInnovationById(innovationId)).thenReturn(Optional.of(innovation));

        ResponseEntity<Innovation> response = innovationController.selectInnovationById(innovationId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(innovation, response.getBody());
    }

    @Test
    @DisplayName("Test selectInnovationById() method with invalid ID")
    void testSelectInnovationByIdInvalid() {
        int innovationId = 1;
        when(innovationService.getInnovationById(innovationId)).thenReturn(Optional.empty());

        ResponseEntity<Innovation> response = innovationController.selectInnovationById(innovationId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    @DisplayName("Test getAllInnovations() method with innovations present")
    void testGetAllInnovationsPresent() {
        Set<BiotechCategory> categorySet = new HashSet<>();
        BiotechCategory category1 = new BiotechCategory(1, EBiotechCategory.Industry_WHITE);
        BiotechCategory category2 = new BiotechCategory(2, EBiotechCategory.Marine_BLUE);
        categorySet.add(category1);
        categorySet.add(category2);
        List<Innovation> innovations = new ArrayList<>();
        innovations.add(new Innovation(1, "Title1", "Description1", "Website1", categorySet));
        innovations.add(new Innovation(2, "Title2", "Description2", "Website2", categorySet));
        when(innovationService.getAllInnovations()).thenReturn(innovations);

        ResponseEntity<List<Innovation>> response = innovationController.getAllInnovations();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(innovations, response.getBody());
    }

    @Test
    @DisplayName("Test getAllInnovations() method with no innovations present")
    void testGetAllInnovationsEmpty() {
        when(innovationService.getAllInnovations()).thenReturn(new ArrayList<>());

        ResponseEntity<List<Innovation>> response = innovationController.getAllInnovations();

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    @DisplayName("Test createInnovation() method with valid input")
    void testCreateInnovationValid() {
        Set<BiotechCategory> categorySet = new HashSet<>();
        BiotechCategory category1 = new BiotechCategory(1, EBiotechCategory.Industry_WHITE);
        BiotechCategory category2 = new BiotechCategory(2, EBiotechCategory.Marine_BLUE);
        categorySet.add(category1);
        categorySet.add(category2);

        Innovation innovation = new Innovation("Title", "Description", "Website", categorySet);
        Innovation savedInnovation = new Innovation(1, "Title", "Description", "Website", categorySet);
        when(innovationService.addInnovation(innovation)).thenReturn(savedInnovation);

        ResponseEntity<Innovation> response = innovationController.createInnovation(innovation);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedInnovation, response.getBody());
    }

    @Test
    @DisplayName("Test createInnovation() method with invalid input")
    void testCreateInnovationInvalid() {
        Innovation innovation = new Innovation();
        when(innovationService.addInnovation(innovation)).thenThrow(new IllegalArgumentException());
        ResponseEntity<Innovation> response = innovationController.createInnovation(null);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

}
