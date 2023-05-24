package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.api.content.SkillOptController;
import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.services.content.SkillOptService;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.ESkillCategory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SkillOptControllerTest {
    @Mock
    private SkillOptService skillOptService;

    @InjectMocks
    private SkillOptController skillOptController;

    @Test
    void testGetSkillOptById() {
        Integer id = 1;
        SkillOpt skillOpt = new SkillOpt();
        skillOpt.setId(id);
        skillOpt.setTitle("Sample Skill Opportunity");

        when(skillOptService.selectSkillOptById(id)).thenReturn(Optional.of(skillOpt));

        ResponseEntity<SkillOpt> response = skillOptController.getSkillOptById(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(skillOpt, response.getBody());
    }

    @Test
    void testGetAllSkillOpts() {
        List<SkillOpt> skillOpts = new ArrayList<>();
        SkillOpt skillOpt1 = new SkillOpt();
        skillOpt1.setId(1);
        skillOpt1.setTitle("Skill Opportunity 1");
        SkillOpt skillOpt2 = new SkillOpt();
        skillOpt2.setId(2);
        skillOpt2.setTitle("Skill Opportunity 2");
        skillOpts.add(skillOpt1);
        skillOpts.add(skillOpt2);

        when(skillOptService.selectAllSkillOpts()).thenReturn(skillOpts);

        ResponseEntity<List<SkillOpt>> response = skillOptController.getAllSkillOpts();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(skillOpts, response.getBody());
    }

    @Test
    void testGetSkillOptsByAccountId() {
        Integer accountId = 1;
        List<SkillOpt> skillOpts = new ArrayList<>();
        SkillOpt skillOpt1 = new SkillOpt();
        skillOpt1.setId(1);
        skillOpt1.setTitle("Skill Opportunity 1");
        SkillOpt skillOpt2 = new SkillOpt();
        skillOpt2.setId(2);
        skillOpt2.setTitle("Skill Opportunity 2");
        skillOpts.add(skillOpt1);
        skillOpts.add(skillOpt2);

        when(skillOptService.selectSkillOptByAccountId(accountId)).thenReturn(skillOpts);

        ResponseEntity<List<SkillOpt>> response = skillOptController.getSkillOptsByAccountId(accountId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(skillOpts, response.getBody());
    }

    @Test
    void testGetSkillOptBySkillCategory() {
        ESkillCategory skillCategoryName = ESkillCategory.ACADEMY;
        List<SkillOpt> skillOpts = new ArrayList<>();
        SkillOpt skillOpt1 = new SkillOpt();
        skillOpt1.setId(1);
        skillOpt1.setTitle("Skill Opportunity 1");
        SkillOpt skillOpt2 = new SkillOpt();
        skillOpt2.setId(2);
        skillOpt2.setTitle("Skill Opportunity 2");
        skillOpts.add(skillOpt1);
        skillOpts.add(skillOpt2);

        when(skillOptService.selectSkillOptBySkillCategory(skillCategoryName)).thenReturn(skillOpts);

        ResponseEntity<List<SkillOpt>> response = skillOptController.getSkillOptBySkillCategory(skillCategoryName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(skillOpts, response.getBody());
    }

    @Test
    void testGetSkillOptByCountry() {
        ECountry countryName = ECountry.POLAND;
        List<SkillOpt> skillOpts = new ArrayList<>();
        SkillOpt skillOpt1 = new SkillOpt();
        skillOpt1.setId(1);
        skillOpt1.setTitle("Skill Opportunity 1");
        SkillOpt skillOpt2 = new SkillOpt();
        skillOpt2.setId(2);
        skillOpt2.setTitle("Skill Opportunity 2");
        skillOpts.add(skillOpt1);
        skillOpts.add(skillOpt2);

        when(skillOptService.selectSkillOptByCountry(countryName)).thenReturn(skillOpts);

        ResponseEntity<List<SkillOpt>> response = skillOptController.getSkillOptByCountry(countryName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(skillOpts, response.getBody());
    }

    @Test
    void testGetSkillOptByTitle() {
        String title = "Sample Skill Opportunity";
        SkillOpt skillOpt = new SkillOpt();
        skillOpt.setId(1);
        skillOpt.setTitle(title);

        when(skillOptService.selectSkillOptByTitle(title)).thenReturn(Optional.of(skillOpt));

        ResponseEntity<SkillOpt> response = skillOptController.getSkillOptByTitle(title);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(skillOpt, response.getBody());
    }

    @Test
    void testGetSkillOptByOrganizer() {
        String organizer = "Sample Organizer";
        SkillOpt skillOpt = new SkillOpt();
        skillOpt.setId(1);
        skillOpt.setOrganizer(organizer);

        when(skillOptService.selectSkillOptByOrganizer(organizer)).thenReturn(Optional.of(skillOpt));

        ResponseEntity<SkillOpt> response = skillOptController.getSkillOptByOrganizer(organizer);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(skillOpt, response.getBody());
    }

    @Test
    void testGetSkillOptByStartDate() {
        Date startDate = new Date();
        SkillOpt skillOpt = new SkillOpt();
        skillOpt.setId(1);
        skillOpt.setStartDate(startDate);

        when(skillOptService.selectSkillOptByStartDate(startDate)).thenReturn(Optional.of(skillOpt));

        ResponseEntity<SkillOpt> response = skillOptController.getSkillOptByStartDate(startDate);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(skillOpt, response.getBody());
    }

    @Test
    void testGetSkillOptByEndDate() {
        Date endDate = new Date();
        SkillOpt skillOpt = new SkillOpt();
        skillOpt.setId(1);
        skillOpt.setEndDate(endDate);

        when(skillOptService.selectSkillOptByEndDate(endDate)).thenReturn(Optional.of(skillOpt));

        ResponseEntity<SkillOpt> response = skillOptController.getSkillOptByEndDate(endDate);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(skillOpt, response.getBody());
    }
}
