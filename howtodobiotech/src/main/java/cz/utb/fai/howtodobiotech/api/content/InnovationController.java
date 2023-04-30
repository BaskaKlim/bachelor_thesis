package cz.utb.fai.howtodobiotech.api.content;

import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.services.content.InnovationService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/innovations")
@RestController
public class InnovationController {
    final
    InnovationService innovationService;

    public InnovationController(InnovationService innovationService) {
        this.innovationService = innovationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Innovation> getInnovationById(@PathVariable("id") Integer id) {
        Optional<Innovation> innovationData = innovationService.selectInnovationById(id);

        if (innovationData.isPresent()) {
            return new ResponseEntity<>(innovationData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping()
    public ResponseEntity<List<Innovation>> getAllInnovations() {
        try {
            List<Innovation> innovations = new ArrayList<>();

            innovationService.selectAllInnovations().forEach(innovations::add);
            if (innovations.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(innovations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<Innovation> createInnovation(@RequestBody Innovation innovation) {
        try {
            Innovation _expert = innovationService
                    .insertInnovation(new Innovation(innovation.getTitle(), innovation.getDescription(), innovation.getWebsite(), innovation.getCountries(), innovation.getCategories()));
            return new ResponseEntity<>(_expert, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteInnovation(@PathVariable("id") Integer id) {
        try {
            innovationService.deleteInnovationById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateInnovation(@PathVariable("id") Integer id, @RequestBody Innovation innovation) {
        try {
            innovationService.updateInnovation(id, innovation);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
        }
    }

    @GetMapping("/by-biotech-category/{biotechCategoryName}")
    public ResponseEntity<List<Innovation>> getInnovationByBiotechCategory(@PathVariable("biotechCategoryName") EBiotechCategory biotechCategoryName) {
        List<Innovation> innovations = innovationService.selectInnovationByBiotechCategory(biotechCategoryName);

        if (innovations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(innovations, HttpStatus.OK);
    }

    @GetMapping("/by-country/{countryName}")
    public ResponseEntity<List<Innovation>> getInnovationByCountry(@PathVariable("countryName") ECountry countryName) {
        List<Innovation> innovations = innovationService.selectInnovationByCountry(countryName);

        if (innovations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(innovations, HttpStatus.OK);
    }

    @GetMapping("/by-title/{title}")
    public ResponseEntity<Innovation> getInnovationOptByTitle(@PathVariable String title) {
        Optional<Innovation> innovation = innovationService.selectInnovationByTitle(title);

        if (innovation.isPresent()) {
            return new ResponseEntity<>(innovation.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
