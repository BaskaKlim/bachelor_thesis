package cz.utb.fai.howtodobiotech.api.content;

import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.services.content.BiotechExpertService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.EExpertCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/experts")
@RestController
public class BiotechExpertController {
    @Autowired
    BiotechExpertService biotechExpertService;

    @GetMapping("/{id}")
    public ResponseEntity<BiotechExpert> getBiotechExpertById(@PathVariable("id") Integer id) {
        Optional<BiotechExpert> expertData = biotechExpertService.selectBiotechExpertById(id);

        if (expertData.isPresent()) {
            return new ResponseEntity<>(expertData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping()
    public ResponseEntity<List<BiotechExpert>> getAllBiotechExperts() {
        try {
            List<BiotechExpert> experts = new ArrayList<>();

            biotechExpertService.selectAllBiotechExperts().forEach(experts::add);
            if (experts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(experts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping()
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BiotechExpert> createBiotechExpert(@RequestBody BiotechExpert expert) {
        try {
            BiotechExpert _expert = biotechExpertService
                    .insertBiotechExpert(new BiotechExpert(expert.getFirstName(), expert.getLastName(), expert.getJobPosition(), expert.getEmail(), expert.getLinkedinUrl(), expert.getProfileImageUrl(),expert.getBackgroundDescription(), expert.getCountries(), expert.getExpertises()));
            return new ResponseEntity<>(_expert, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Boolean> deleteBiotechExpert(@PathVariable("id") Integer id) {
        try {
            biotechExpertService.deleteBiotechExpertById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BiotechExpert> updateBiotechExpert(@PathVariable("id") Integer id, @RequestBody BiotechExpert expert) {
        try {
            biotechExpertService.updateBiotechExpert(id, expert);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
        }
    }

    @GetMapping("/by-expertise/{expertiseName}")
    public ResponseEntity<List<BiotechExpert>> getBiotechExpertByExpertise(@PathVariable("expertiseName") EExpertCategory expertiseName) {
        List<BiotechExpert> biotechExperts = biotechExpertService.selectBiotechExpertByExpertise(expertiseName);

        if (biotechExperts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(biotechExperts, HttpStatus.OK);
    }

    @GetMapping("/by-country/{countryName}")
    public ResponseEntity<List<BiotechExpert>> getBiotechExpertByCountry(@PathVariable("countryName") ECountry countryName) {
        List<BiotechExpert> biotechExperts = biotechExpertService.selectBiotechExpertByCountry(countryName);

        if (biotechExperts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(biotechExperts, HttpStatus.OK);
    }

    @GetMapping("/by-last-name/{lastName}")
    public ResponseEntity<BiotechExpert> getBiotechExpertOptByTitle(@PathVariable String lastName) {
        Optional<BiotechExpert> biotechExpert = biotechExpertService.selectBiotechExpertByLastName(lastName);

        if (biotechExpert.isPresent()) {
            return new ResponseEntity<>(biotechExpert.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
