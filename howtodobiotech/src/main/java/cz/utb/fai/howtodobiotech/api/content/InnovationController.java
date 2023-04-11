package cz.utb.fai.howtodobiotech.api.content;

import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.services.content.InnovationService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    InnovationService innovationService;

    @GetMapping("/{id}")
    public ResponseEntity<Innovation> selectInnovationById(@PathVariable("id") Integer id) {
        Optional<Innovation> innovationData = innovationService.getInnovationById(id);

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

            innovationService.getAllInnovations().forEach(innovations::add);
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
                    .addInnovation(new Innovation(innovation.getTitle(), innovation.getDescription(), innovation.getWebsite(), innovation.getCategories()));
            return new ResponseEntity<>(_expert, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteInnovation(@PathVariable("id") Integer id) {
        try {
            innovationService.deleteInnovationById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Innovation> updateInnovation(@PathVariable("id") Integer id, @RequestBody Innovation innovation) {
        Optional<Innovation> innovationData = innovationService.getInnovationById(id);
        if (innovationData.isPresent()) {
            Innovation _innovation = innovationData.get();
            _innovation.setTitle(innovation.getTitle());
            _innovation.setDescription(innovation.getDescription());
            _innovation.setWebsite(innovation.getWebsite());
            _innovation.setCategories(innovation.getCategories());


            return new ResponseEntity<>(innovationService.updateInnovation(_innovation), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
