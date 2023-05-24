package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.api.categories.CountryController;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.services.categories.CountryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CountryControllerTest {
    @Mock
    private CountryService countryService;

    @InjectMocks
    private CountryController countryController;

    private MockMvc mockMvc;

    @Test
    void testGetAllCountries() {
        List<Country> countries = new ArrayList<>();
        countries.add(new Country());
        countries.add(new Country());

        when(countryService.getAllCountries()).thenReturn(countries);

        ResponseEntity<List<Country>> response = countryController.getAllCountries();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(countries, response.getBody());
    }

    @Test
    void testGetCountryById() {
        int countryId = 1;
        Country country = new Country();
        country.setId(countryId);
        Optional<Country> countryData = Optional.of(country);

        when(countryService.getCountryById(countryId)).thenReturn(countryData);

        ResponseEntity<Country> response = countryController.getCountryById(countryId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(countryData.get(), response.getBody());
    }
}
