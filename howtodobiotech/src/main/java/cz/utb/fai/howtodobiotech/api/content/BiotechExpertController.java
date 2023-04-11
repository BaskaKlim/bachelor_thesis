package cz.utb.fai.howtodobiotech.api.content;

import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.models.users.Contact;
import cz.utb.fai.howtodobiotech.services.content.BiotechExpertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<BiotechExpert> selectBiotechExpertById(@PathVariable("id") Integer id) {
        Optional<BiotechExpert> expertData = biotechExpertService.getBiotechExpertById(id);

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

            biotechExpertService.getAllBiotechExperts().forEach(experts::add);
            if (experts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(experts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping()
    public ResponseEntity<BiotechExpert> createBiotechExpert(@RequestBody BiotechExpert expert) {
        try {
            BiotechExpert _expert = biotechExpertService
                    .addBiotechExpert(new BiotechExpert(expert.getFirstName(), expert.getLastName(), expert.getJobPosition(), expert.getEmail(), expert.getLinkedinUrl(), expert.getBackgroundDescription(), expert.getExpertise()));
            return new ResponseEntity<>(_expert, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteBiotechExpert(@PathVariable("id") Integer id) {
        try {
            biotechExpertService.deleteBiotechExpertById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BiotechExpert> updateContact(@PathVariable("id") Integer id, @RequestBody BiotechExpert account) {
        Optional<BiotechExpert> expertData = biotechExpertService.getBiotechExpertById(id);
        if (expertData.isPresent()) {
            BiotechExpert _account = expertData.get();
            _account.setFirstName(account.getFirstName());
            _account.setLastName(account.getLastName());
            _account.setJobPosition(account.getJobPosition());
            _account.setEmail(account.getEmail());
            _account.setBackgroundDescription(account.getJobPosition());
            _account.setBackgroundDescription(account.getBackgroundDescription());
            _account.setExpertise(account.getExpertise());


            return new ResponseEntity<>(biotechExpertService.updateBiotechExpert(_account), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
