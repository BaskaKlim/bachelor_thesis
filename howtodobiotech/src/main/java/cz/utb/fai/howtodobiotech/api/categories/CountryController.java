package cz.utb.fai.howtodobiotech.api.categories;

import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.services.categories.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    @Autowired
    private CountryService countryService;

    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        List<Country> countries = countryService.getAllCountries();
        return ResponseEntity.ok().body(countries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable("id") Integer id) {
        Optional<Country> country = countryService.getCountryById(id);

        if (country.isPresent()) {
            return ResponseEntity.ok().body(country.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
