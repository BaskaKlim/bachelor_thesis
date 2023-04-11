package cz.utb.fai.howtodobiotech.services.content;


import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.repositories.content.SkillOptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SkillOptService {
    SkillOptRepository skillOptRepository;

    @Autowired
    public SkillOptService(SkillOptRepository skillOptRepository) {
        this.skillOptRepository = skillOptRepository;
    }


    public Optional<SkillOpt> getSkillOptById(Integer id) {
        return skillOptRepository.findById(id);
    }

    public List<SkillOpt> getAllSkillOpts() {
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

}
