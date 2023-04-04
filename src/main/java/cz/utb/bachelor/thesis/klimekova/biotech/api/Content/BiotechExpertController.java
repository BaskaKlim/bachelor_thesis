package cz.utb.bachelor.thesis.klimekova.biotech.api.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Content.BiotechExpert;
import cz.utb.bachelor.thesis.klimekova.biotech.serivce.Content.BiotechExpertService;
import cz.utb.bachelor.thesis.klimekova.biotech.utils.enums.EExpertCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/experts")
@RestController

public class BiotechExpertController {

    @Autowired
    BiotechExpertService biotechExpertService;

    @GetMapping()
    public ResponseEntity<List<BiotechExpert>> getAllExperts() {
        try {
            List<BiotechExpert> biotechExperts = new ArrayList<>();

            biotechExpertService.getAllBiotechExpert().forEach(biotechExperts::add);
            if (biotechExperts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(biotechExperts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /*
    @GetMapping("/{expertise}")

    public ResponseEntity<List<BiotechExpert>> getExpertsByExpertise(@PathVariable("expertise") EExpertCategory expertise) {
        try {
            List<BiotechExpert> experts = new ArrayList<>();

            biotechExpertService.getExpertsByExpertise(expertise).forEach(experts::add);
            if (experts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<List<BiotechExpert>>(experts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    */
}
