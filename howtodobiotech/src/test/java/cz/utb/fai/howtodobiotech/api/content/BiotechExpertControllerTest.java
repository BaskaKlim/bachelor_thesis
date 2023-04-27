package cz.utb.fai.howtodobiotech.api.content;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.services.content.BiotechExpertService;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BiotechExpertControllerTest {

    @Mock
    private BiotechExpertService biotechExpertService;

    @InjectMocks
    private BiotechExpertController biotechExpertController;

    private List<BiotechExpert> expertList;

    @BeforeEach
    void setUp() {
        expertList = new ArrayList<>();
        expertList.add(new BiotechExpert(1, "John", "Doe", "Job 1", "john.doe@test.com", "www.linkedin.com", "Description 1", null ,null));
        expertList.add(new BiotechExpert(2, "Jane", "Doe", "Job 2", "jane.doe@test.com", "www.linkedin.com", "Description 2", null,  null));
    }

    @Test
    @DisplayName("Test getBiotechExpertById - success")
    void testSelectBiotechExpertById_Success() {
        // Arrange
        int id = 1;
        BiotechExpert expert = expertList.get(0);
        when(biotechExpertService.getBiotechExpertById(id)).thenReturn(Optional.of(expert));

        // Act
        ResponseEntity<BiotechExpert> response = biotechExpertController.selectBiotechExpertById(id);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expert, response.getBody());
    }

    @Test
    @DisplayName("Test getBiotechExpertById - not found")
    void testSelectBiotechExpertById_NotFound() {
        // Arrange
        int id = 3;
        when(biotechExpertService.getBiotechExpertById(id)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<BiotechExpert> response = biotechExpertController.selectBiotechExpertById(id);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    @DisplayName("Test getAllBiotechExperts - success")
    void testGetAllBiotechExperts_Success() {
        // Arrange
        when(biotechExpertService.getAllBiotechExperts()).thenReturn(expertList);

        // Act
        ResponseEntity<List<BiotechExpert>> response = biotechExpertController.getAllBiotechExperts();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expertList, response.getBody());
    }

    @Test
    @DisplayName("Test getAllBiotechExperts - no content")
    void testGetAllBiotechExperts_NoContent() {
        // Arrange
        when(biotechExpertService.getAllBiotechExperts()).thenReturn(new ArrayList<BiotechExpert>());

        // Act
        ResponseEntity<List<BiotechExpert>> response = biotechExpertController.getAllBiotechExperts();

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    /*
    @Test
    @DisplayName("Test createBiotechExpert - success")
    void testCreateBiotechExpert_Success() {
        // Arrange
        BiotechExpert expert = expertList.get(0);
      //  ResponseEntity<BiotechExpert> response = new ResponseEntity<>(expert, HttpStatus.CREATED);


        when(biotechExpertService.addBiotechExpert(expert)).thenReturn(expert);
        ResponseEntity<BiotechExpert> response = biotechExpertController.createBiotechExpert(expert);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(expert, response.getBody());

    }

     */
}
