package cz.utb.fai.howtodobiotech.services;

import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.repositories.categories.CountryRepository;
import cz.utb.fai.howtodobiotech.services.categories.CountryService;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class CountryServiceTest {

    @Mock
    private CountryRepository countryRepository;

    @InjectMocks
    private CountryService countryService;

    private Country country1;
    private Country country2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Create the preset objects
        country1 = new Country();
        country1.setId(1);
        country1.setName(ECountry.CZECHIA);

        country2 = new Country();
        country2.setId(2);
        country2.setName(ECountry.SLOVAKIA);
    }

    @Test
    void testGetAllCountries() {
        List<Country> countries = Arrays.asList(country1, country2);
        when(countryRepository.findAll()).thenReturn(countries);
        List<Country> result = countryService.getAllCountries();

        assertEquals(2, result.size());
        assertEquals(country1, result.get(0));
        assertEquals(country2, result.get(1));
        verify(countryRepository, times(1)).findAll();
    }

    @Test
    void testGetCountryById_ExistingCountry() {
        int countryId = 1;
        when(countryRepository.findById(countryId)).thenReturn(Optional.of(country1));
        Optional<Country> result = countryService.getCountryById(countryId);

        assertTrue(result.isPresent());
        assertEquals(country1, result.get());
        verify(countryRepository, times(1)).findById(countryId);
    }

    @Test
    void testGetCountryById_NonExistingCountry() {
        int countryId = 3;
        when(countryRepository.findById(countryId)).thenReturn(Optional.empty());
        Optional<Country> result = countryService.getCountryById(countryId);

        assertTrue(result.isEmpty());
        verify(countryRepository, times(1)).findById(countryId);
    }
}
