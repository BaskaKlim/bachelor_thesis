package cz.utb.fai.howtodobiotech.api.content;

import cz.utb.fai.howtodobiotech.models.content.StartupOpt;
import cz.utb.fai.howtodobiotech.services.content.StartupOptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/startup-opportunities")
@RestController
public class StartupOptController {

    @Autowired
    StartupOptService startupOptService;

    @GetMapping("/{id}")
    public ResponseEntity<StartupOpt> selectStartupOptById(@PathVariable("id") Integer id) {
        Optional<StartupOpt> startupOptData = startupOptService.getStartupOptById(id);

        if (startupOptData.isPresent()) {
            return new ResponseEntity<>(startupOptData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping()
    public ResponseEntity<List<StartupOpt>> getAllStartupOpts() {
        try {
            List<StartupOpt> startupOpts = new ArrayList<>();

            startupOptService.getAllStartupOpts().forEach(startupOpts::add);
            if (startupOpts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(startupOpts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<StartupOpt> createStartupOpt(@RequestBody StartupOpt startupOpt) {
        try {
            StartupOpt _startupOpt = startupOptService
                    .addSStartupOpt(new StartupOpt(startupOpt.getTitle(), startupOpt.getProvider(), startupOpt.getDescription(), startupOpt.getStartDate(), startupOpt.getEndDate(), startupOpt.getWebsite(), startupOpt.getAccountId(),startupOpt.getCountries(),startupOpt.getCategories(), startupOpt.getSupportCategories()));
            return new ResponseEntity<>(_startupOpt, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteStartupOpt(@PathVariable("id") Integer id) {
        try {
            startupOptService.deleteStartupOptById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<StartupOpt> updateStartupOpt(@PathVariable("id") Integer id, @RequestBody StartupOpt startupOpt) {
        Optional<StartupOpt> startupOptData = startupOptService.getStartupOptById(id);
        if (startupOptData.isPresent()) {
            StartupOpt _startupOpt = startupOptData.get();
            _startupOpt.setTitle(startupOpt.getTitle());
            _startupOpt.setProvider(startupOpt.getProvider());
            _startupOpt.setDescription(startupOpt.getDescription());
            _startupOpt.setStartDate(startupOpt.getStartDate());
            _startupOpt.setEndDate(startupOpt.getEndDate());
            _startupOpt.setAccountId(startupOpt.getAccountId());
            _startupOpt.setWebsite(startupOpt.getWebsite());
            _startupOpt.setCountries(startupOpt.getCountries());
            _startupOpt.setCategories(startupOpt.getCategories());
            _startupOpt.setSupportCategories(startupOpt.getSupportCategories());

            return new ResponseEntity<>(startupOptService.updateStartupOpt(_startupOpt), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
