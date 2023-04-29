package cz.utb.fai.howtodobiotech.api.content;

import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.models.content.StartupOpt;
import cz.utb.fai.howtodobiotech.services.content.StartupOptService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ESkillCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ESupportCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
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
    public ResponseEntity<?> updateStartupOpt(@PathVariable Integer id, @RequestBody StartupOpt request) {
       startupOptService.updateStartupOpt(id,request );

        return ResponseEntity.ok().build();
    }

    @GetMapping("/by-biotech-category/{biotechCategoryName}")
    public ResponseEntity<List<StartupOpt>> getStartupOptByBiotechCategory(@PathVariable("biotechCategoryName") EBiotechCategory biotechCategoryName) {
        List<StartupOpt> startupOpts = startupOptService.selectStartupOptByBiotechCategory(biotechCategoryName);

        if (startupOpts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(startupOpts, HttpStatus.OK);
    }

    @GetMapping("/by-support-category/{supportCategoryName}")
    public ResponseEntity<List<StartupOpt>> getStartupOptBySupportCategory(@PathVariable("supportCategoryName") ESupportCategory supportCategoryName) {
        List<StartupOpt> startupSupportCategories = startupOptService.selectStartupOptBySupportCategory(supportCategoryName);

        if (startupSupportCategories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(startupSupportCategories, HttpStatus.OK);
    }

    @GetMapping("/by-title/{title}")
    public ResponseEntity<StartupOpt> getStartupOptByTitle(@PathVariable String title) {
        Optional<StartupOpt> startupOpt = startupOptService.selectStartupOptByTitle(title);

        if (startupOpt.isPresent()) {
            return new ResponseEntity<>(startupOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(startupOpt.get(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/by-provider/{provider}")
    public ResponseEntity<StartupOpt> getStartupOptByProvider(@PathVariable String provider) {
        Optional<StartupOpt> startupOpt = startupOptService.selectStartupOptByProvider(provider);

        if (startupOpt.isPresent()) {
            return new ResponseEntity<>(startupOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(startupOpt.get(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/by-start-date/{startDate}")
    public ResponseEntity<StartupOpt> getStartupOptByStartDate(@PathVariable("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate) {
        Optional<StartupOpt> startupOpt = startupOptService.selectStartupOptByStartDate(startDate);

        if (startupOpt.isPresent()) {
            return new ResponseEntity<>(startupOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(startupOpt.get(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/by-end-date/{endDate}")
    public ResponseEntity<StartupOpt> getStartupOptByEndDate(@PathVariable("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        Optional<StartupOpt> startupOpt = startupOptService.selectStartupOptByEndDate(endDate);

        if (startupOpt.isPresent()) {
            return new ResponseEntity<>(startupOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(startupOpt.get(), HttpStatus.NOT_FOUND);
        }
    }

}
