package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Content.SkillOpt;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Content.SkillOptRepository;
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

    public Optional<SkillOpt> getInnovationById(Integer id) {
        return skillOptRepository.findById(id);
    }

    public SkillOpt addInnovation(SkillOpt skillOpt) {
        return skillOptRepository.save(skillOpt);
    }

    public void deleteInnovationById(Integer id) {
        skillOptRepository.deleteById(id);
    }

    public SkillOpt updateInnovation(SkillOpt skillOpt) {
        return skillOptRepository.save(skillOpt);
    }

    public List<SkillOpt> getAllInnovations() {
        List<SkillOpt> skillOpts = new ArrayList<SkillOpt>();
        skillOptRepository.findAll().forEach(skillOpts::add);

        return skillOpts;
    }
    
}
