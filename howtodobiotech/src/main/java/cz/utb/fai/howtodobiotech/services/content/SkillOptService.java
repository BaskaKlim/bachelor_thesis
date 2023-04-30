package cz.utb.fai.howtodobiotech.services.content;


import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.SkillCategory;
import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.repositories.content.SkillOptRepository;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.ESkillCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.util.*;

@Service
public class SkillOptService {
    SkillOptRepository skillOptRepository;

    @Autowired
    public SkillOptService(SkillOptRepository skillOptRepository) {
        this.skillOptRepository = skillOptRepository;
    }


    public Optional<SkillOpt> selectSkillOptById(Integer id) {
        return skillOptRepository.findById(id);
    }

    public List<SkillOpt> selectAllSkillOpts() {
        List<SkillOpt> skillOptList = new ArrayList<>();
        skillOptRepository.findAllWithDetails().forEach(skillOptList::add);

        return skillOptList;
    }

    public SkillOpt insertSkillOpt(SkillOpt skillOpt) {
        return skillOptRepository.save(skillOpt);
    }

    @Transactional
    public void updateSkillOpt(Integer id, SkillOpt skillOptDto) {
        SkillOpt skillOpt = skillOptRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Skill opportunity not found with id: " + id));

        Set<Country> countries = skillOptDto.getCountries();
        Set<BiotechCategory> biotechCategories = skillOptDto.getBiotechCategories();
        Set<SkillCategory> skillCategories = skillOptDto.getSkillCategories();
        skillOpt.setTitle(skillOptDto.getTitle());
        skillOpt.setOrganizer(skillOptDto.getOrganizer());
        skillOpt.setDescription(skillOptDto.getDescription());
        skillOpt.setStartDate(skillOptDto.getStartDate());
        skillOpt.setEndDate(skillOptDto.getEndDate());
        skillOpt.setWebsite(skillOptDto.getWebsite());
        skillOpt.setCountries(countries);
        skillOpt.setAccountId(skillOptDto.getAccountId());
        skillOpt.setBiotechCategories(biotechCategories);
        skillOpt.setSkillCategories(skillCategories);

        skillOptRepository.save(skillOpt);
    }

    public void deleteSkillOptById(Integer id) {
        skillOptRepository.deleteById(id);
    }

    public List<SkillOpt> selectSkillOptByBiotechCategory(EBiotechCategory biotechCategoryName) {
        return skillOptRepository.findByBiotechCategoryName(biotechCategoryName);
    }

    public List<SkillOpt> selectSkillOptBySkillCategory(ESkillCategory skillCategoryName) {
        return skillOptRepository.findBySkillCategoryName(skillCategoryName);

    }

    public List<SkillOpt> selectSkillOptByCountry(ECountry countryName) {
        return skillOptRepository.findByCountryName(countryName);
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
