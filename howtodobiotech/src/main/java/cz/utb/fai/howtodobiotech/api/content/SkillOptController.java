package cz.utb.fai.howtodobiotech.api.content;

import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.services.content.SkillOptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/skill-opportunities")
@RestController
public class SkillOptController {
    @Autowired
    SkillOptService skillOptService;

    @GetMapping("/{id}")
    public ResponseEntity<SkillOpt> selectSkillOptById(@PathVariable("id") Integer id) {
        Optional<SkillOpt> skillOptData = skillOptService.getSkillOptById(id);

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

            skillOptService.getAllSkillOpts().forEach(skillOptList::add);
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
                    .addSkillOpt(new SkillOpt(skillOpt.getTitle(), skillOpt.getOrganizer(), skillOpt.getDescription(), skillOpt.getStartDate(), skillOpt.getEndDate(), skillOpt.getWebsite(), skillOpt.getCategories(), skillOpt.getSkillCategories()));
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
        Optional<SkillOpt> skillOptData = skillOptService.getSkillOptById(id);
        if (skillOptData.isPresent()) {
            SkillOpt _skillOpt = skillOptData.get();
            _skillOpt.setTitle(skillOpt.getTitle());
            _skillOpt.setDescription(skillOpt.getDescription());
            _skillOpt.setWebsite(skillOpt.getWebsite());
            _skillOpt.setCategories(skillOpt.getCategories());


            return new ResponseEntity<>(skillOptService.updateSkillOpt(_skillOpt), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
