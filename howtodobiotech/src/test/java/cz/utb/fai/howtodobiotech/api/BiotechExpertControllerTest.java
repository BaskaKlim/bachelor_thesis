package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.api.content.BiotechExpertController;
import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.services.content.BiotechExpertService;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.EExpertCategory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BiotechExpertControllerTest {
    @Mock
    private BiotechExpertService biotechExpertService;

    @InjectMocks
    private BiotechExpertController biotechExpertController;

    @Test
    void testGetBiotechExpertById() {
        int expertId = 1;
        BiotechExpert expert = new BiotechExpert();
        expert.setId(expertId);
        Optional<BiotechExpert> expertData = Optional.of(expert);
        when(biotechExpertService.selectBiotechExpertById(expertId)).thenReturn(expertData);

        ResponseEntity<BiotechExpert> response = biotechExpertController.getBiotechExpertById(expertId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expertData.get(), response.getBody());
    }

    @Test
    void testGetAllBiotechExperts() {
        BiotechExpert expert1 = new BiotechExpert();
        BiotechExpert expert2 = new BiotechExpert();
        List<BiotechExpert> experts = new ArrayList<>();
        experts.add(expert1);
        experts.add(expert2);
        when(biotechExpertService.selectAllBiotechExperts()).thenReturn(experts);

        ResponseEntity<List<BiotechExpert>> response = biotechExpertController.getAllBiotechExperts();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(experts, response.getBody());
    }
    @Test
    void testGetBiotechExpertByExpertise() {
        EExpertCategory expertiseName = EExpertCategory.PRODUCT_DESING;
        List<BiotechExpert> biotechExperts = new ArrayList<>();
        biotechExperts.add(new BiotechExpert());

        when(biotechExpertService.selectBiotechExpertByExpertise(expertiseName)).thenReturn(biotechExperts);

        ResponseEntity<List<BiotechExpert>> response = biotechExpertController.getBiotechExpertByExpertise(expertiseName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(biotechExperts, response.getBody());
    }

    @Test
    void testGetBiotechExpertByCountry() {
        ECountry countryName = ECountry.HUNGARY;
        List<BiotechExpert> biotechExperts = new ArrayList<>();
        biotechExperts.add(new BiotechExpert());

        when(biotechExpertService.selectBiotechExpertByCountry(countryName)).thenReturn(biotechExperts);

        ResponseEntity<List<BiotechExpert>> response = biotechExpertController.getBiotechExpertByCountry(countryName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(biotechExperts, response.getBody());
    }

    @Test
    void testGetBiotechExpertOptByTitle() {
        String lastName = "Some Last Name";
        BiotechExpert biotechExpert = new BiotechExpert();
        Optional<BiotechExpert> biotechExpertData = Optional.of(biotechExpert);
        when(biotechExpertService.selectBiotechExpertByLastName(lastName)).thenReturn(biotechExpertData);

        ResponseEntity<BiotechExpert> response = biotechExpertController.getBiotechExpertOptByTitle(lastName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(biotechExpertData.get(), response.getBody());
    }
}
