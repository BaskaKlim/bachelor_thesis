package cz.utb.fai.howtodobiotech.services.content;


import cz.utb.fai.howtodobiotech.models.categories.SkillCategory;
import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.repositories.categories.SkillCategoryRepository;
import cz.utb.fai.howtodobiotech.repositories.content.SkillOptRepository;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ESkillCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SkillOptService {
    SkillOptRepository skillOptRepository;

    SkillCategoryRepository skillCategoryRepository;

    @Autowired
    public SkillOptService(SkillOptRepository skillOptRepository) {
        this.skillOptRepository = skillOptRepository;
    }


    public Optional<SkillOpt> selectSkillOptById(Integer id) {
        return skillOptRepository.findById(id);
    }

    public List<SkillOpt> selectAllSkillOpts() {
        List<SkillOpt> skillOptList = new ArrayList<SkillOpt>();
        skillOptRepository.findAll().forEach(skillOptList::add);

        return skillOptList;
    }

    public SkillOpt addSkillOpt(SkillOpt skillOpt) {
        return skillOptRepository.save(skillOpt);

    }
    public SkillOpt updateSkillOpt(SkillOpt skillOpt) {
        return skillOptRepository.save(skillOpt);
    }

    public void deleteSkillOptById(Integer id) {
        skillOptRepository.deleteById(id);
    }

    public Optional<SkillOpt> selectSkillOptByBiotechCategory(EBiotechCategory biotechCategory) {
        return skillOptRepository.findByBiotechCategories(biotechCategory);
    }
    public List<SkillOpt> selectSkillOptBySkillCategory(Integer skillCategoryId) {
        Optional<SkillCategory> category =  skillCategoryRepository.findById(skillCategoryId);
        List<SkillOpt> skillOpts = skillOptRepository.findBySkillCategories(category);
        return skillOpts;
    }


    public Optional<SkillOpt> selectSkillOptByTitle(String title) {
        return skillOptRepository.findByTitle(title);
    }

    public Optional<SkillOpt> selectSkillOptByOrganizer(String organizer) {
        return skillOptRepository.findByOrganizer(organizer);
    }

    public Optional<SkillOpt> selectSkillOptByStartDate(Date startDate) {
        return skillOptRepository.findByStartDate(startDate);
    }

    public Optional<SkillOpt> selectSkillOptByEndDate(Date endDate) {
        return skillOptRepository.findByEndDate(endDate);
    }
}
