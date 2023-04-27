package cz.utb.fai.howtodobiotech.api.content;
import static org.mockito.Mockito.when;
import java.util.*;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import org.joda.time.LocalDate;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.services.content.SkillOptService;

@ExtendWith(MockitoExtension.class)
public class SkillOptControllerTest {

    @Mock
    SkillOptService skillOptService;

    @InjectMocks
    SkillOptController skillOptController;

    private SkillOpt skillOpt;
    private List<SkillOpt> skillOptList;

    @BeforeEach
    void setUp() {
        Set<BiotechCategory> categorySet = new HashSet<>();
        BiotechCategory category1 = new BiotechCategory(1, EBiotechCategory.Energy);
        BiotechCategory category2 = new BiotechCategory(2, EBiotechCategory.Marine);
        categorySet.add(category1);
        categorySet.add(category2);

        skillOpt = new SkillOpt();
        skillOpt.setId(1);
        skillOpt.setTitle("Title");
        skillOpt.setWebsite("www.example.sk");
        skillOpt.setDescription("Description of Skill Opportunity");
        skillOpt.setOrganizer("Organizer");
        skillOpt.setStartDate(new Date());
        skillOpt.setEndDate(new Date());
        skillOpt.setBiotechCategories(categorySet);
        skillOptList = new ArrayList<>();
        skillOptList.add(skillOpt);
    }

    @Test
    void selectSkillOptById_ShouldReturnOk() {
        when(skillOptService.selectSkillOptById(1)).thenReturn(Optional.of(skillOpt));
        ResponseEntity<SkillOpt> responseEntity = skillOptController.getSkillOptById(1);
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(skillOpt, responseEntity.getBody());
    }

    @Test
    void selectSkillOptById_ShouldReturnNotFound() {
        when(skillOptService.selectSkillOptById(1)).thenReturn(Optional.empty());
        ResponseEntity<SkillOpt> responseEntity = skillOptController.getSkillOptById(1);
        Assertions.assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void getAllSkillOpts_ShouldReturnOk() {
        when(skillOptService.selectAllSkillOpts()).thenReturn(skillOptList);
        ResponseEntity<List<SkillOpt>> responseEntity = skillOptController.getAllSkillOpts();
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(skillOptList, responseEntity.getBody());
    }

    @Test
    void getAllSkillOpts_ShouldReturnNoContent() {
        when(skillOptService.selectAllSkillOpts()).thenReturn(new ArrayList<>());
        ResponseEntity<List<SkillOpt>> responseEntity = skillOptController.getAllSkillOpts();
        Assertions.assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
    }
/*
    @Test
    void createSkillOpt_ShouldReturnCreated() {
        when(skillOptService.addSkillOpt(skillOpt)).thenReturn(skillOpt);
        ResponseEntity<SkillOpt> responseEntity = skillOptController.createSkillOpt(skillOpt);
        Assertions.assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        Assertions.assertEquals(skillOpt, responseEntity.getBody());
    }
*/
    @Test
    void createSkillOpt_ShouldReturnInternalServerError() {
        when(skillOptService.addSkillOpt(skillOpt)).thenThrow(new RuntimeException());
        ResponseEntity<SkillOpt> responseEntity = skillOptController.createSkillOpt(skillOpt);
        Assertions.assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        Assertions.assertNull(responseEntity.getBody());
    }

    @Test
    void deleteSkillOpt_ShouldReturnNoContent() {
        ResponseEntity<Boolean> responseEntity = skillOptController.deleteSkillOpt(1);
        Assertions.assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
    }
}