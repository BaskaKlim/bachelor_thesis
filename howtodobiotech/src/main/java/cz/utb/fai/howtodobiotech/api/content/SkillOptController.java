package cz.utb.fai.howtodobiotech.api.content;

import cz.utb.fai.howtodobiotech.models.categories.SkillCategory;
import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.services.content.SkillOptService;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ESkillCategory;
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
@RequestMapping("api/skill-opportunities")
@RestController
public class SkillOptController {
    @Autowired
    SkillOptService skillOptService;

    @GetMapping("/{id}")
    public ResponseEntity<SkillOpt> getSkillOptById(@PathVariable("id") Integer id) {
        Optional<SkillOpt> skillOptData = skillOptService.selectSkillOptById(id);

        if (skillOptData.isPresent()) {
            return new ResponseEntity<>(skillOptData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping()
    public ResponseEntity<List<SkillOpt>> getAllSkillOpts() {
        try {
            List<SkillOpt> skillOptList = new ArrayList<>();

            skillOptService.selectAllSkillOpts().forEach(skillOptList::add);
            if (skillOptList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(skillOptList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<SkillOpt> createSkillOpt(@RequestBody SkillOpt skillOpt) {
        try {
            SkillOpt _skillOpt = skillOptService
                    .addSkillOpt(new SkillOpt(skillOpt.getTitle(), skillOpt.getOrganizer(), skillOpt.getDescription(), skillOpt.getStartDate(), skillOpt.getEndDate(), skillOpt.getWebsite(), skillOpt.getCountry(),skillOpt.getAccountId(),skillOpt.getBiotechCategories(), skillOpt.getSkillCategories()));
            return new ResponseEntity<>(_skillOpt, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteSkillOpt(@PathVariable("id") Integer id) {
        try {
            skillOptService.deleteSkillOptById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillOpt> updateSkillOpt(@PathVariable("id") Integer id, @RequestBody SkillOpt skillOpt) {
        Optional<SkillOpt> skillOptData = skillOptService.selectSkillOptById(id);
        if (skillOptData.isPresent()) {
            SkillOpt _skillOpt = skillOptData.get();
            _skillOpt.setTitle(skillOpt.getTitle());
            _skillOpt.setOrganizer(skillOpt.getOrganizer());
            _skillOpt.setDescription(skillOpt.getDescription());
            _skillOpt.setStartDate(skillOpt.getStartDate());
            _skillOpt.setEndDate(skillOpt.getEndDate());
            _skillOpt.setWebsite(skillOpt.getWebsite());
            _skillOpt.setCountry(skillOpt.getCountry());
            _skillOpt.setAccountId(skillOpt.getAccountId());
            _skillOpt.setAccountId(skillOpt.getAccountId());
            _skillOpt.setBiotechCategories(skillOpt.getBiotechCategories());
            _skillOpt.setSkillCategories(skillOpt.getSkillCategories());

            return new ResponseEntity<>(skillOptService.updateSkillOpt(_skillOpt), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/by-biotech-category/{biotechCategoryName}")
    public ResponseEntity<List<SkillOpt>> getSkillOptByBiotechCategory(@PathVariable ("biotechCategoryName") EBiotechCategory biotechCategoryName) {
        List<SkillOpt> skillOpts = skillOptService.selectSkillOptByBiotechCategory(biotechCategoryName);

        if (skillOpts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(skillOpts, HttpStatus.OK);
    }

    @GetMapping("/by-skill-category/{skillCategoryName}")
    public ResponseEntity<List<SkillOpt>>getSkillOptBySkillCategory(@PathVariable("skillCategoryName") ESkillCategory skillCategoryName) {
        List<SkillOpt> skillOpts = skillOptService.selectSkillOptBySkillCategory(skillCategoryName);

        if (skillOpts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(skillOpts, HttpStatus.OK);
    }

    @GetMapping("/by-title/{title}")
    public ResponseEntity<SkillOpt> getSkillOptByTitle(@PathVariable String title) {
        Optional<SkillOpt> skillOpt = skillOptService.selectSkillOptByTitle(title);

        if (skillOpt.isPresent()) {
            return new ResponseEntity<>(skillOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(skillOpt.get(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/by-organizer/{organizer}")
    public ResponseEntity<SkillOpt> getSkillOptByOrganizer(@PathVariable String organizer) {
        Optional<SkillOpt> skillOpt = skillOptService.selectSkillOptByOrganizer(organizer);

        if (skillOpt.isPresent()) {
            return new ResponseEntity<>(skillOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(skillOpt.get(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/by-start-date/{startDate}")
    public ResponseEntity<SkillOpt> getSkillOptByStartDate(@PathVariable("startDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date startDate) {
        Optional<SkillOpt> skillOpt = skillOptService.selectSkillOptByStartDate(startDate);

        if (skillOpt.isPresent()) {
            return new ResponseEntity<>(skillOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(skillOpt.get(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/by-end-date/{endDate}")
    public ResponseEntity<SkillOpt> getSkillOptByEndDate(@PathVariable("endDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date endDate) {
        Optional<SkillOpt> skillOpt = skillOptService.selectSkillOptByEndDate(endDate);

        if (skillOpt.isPresent()) {
            return new ResponseEntity<>(skillOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(skillOpt.get(), HttpStatus.NOT_FOUND);
        }
    }
}

