package cz.utb.fai.howtodobiotech.services.content;

import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.models.content.StartupOpt;
import cz.utb.fai.howtodobiotech.repositories.content.StartupOptRepository;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ESupportCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class StartupOptService {
    StartupOptRepository startupOptRepository;

    @Autowired
    public StartupOptService(StartupOptRepository startupOptRepository) {
        this.startupOptRepository = startupOptRepository;
    }

    public Optional<StartupOpt> getStartupOptById(Integer id) {
        return startupOptRepository.findById(id);
    }

    public List<StartupOpt> getAllStartupOpts() {
        List<StartupOpt> startupOpts = new ArrayList<StartupOpt>();
        startupOptRepository.findAll().forEach(startupOpts::add);

        return startupOpts;
    }


    public StartupOpt addSStartupOpt(StartupOpt startupOpt) {
        return startupOptRepository.save(startupOpt);

    }

    public StartupOpt updateStartupOpt(StartupOpt startupOpt) {
        return startupOptRepository.save(startupOpt);
    }

    public void deleteStartupOptById(Integer id) {
        startupOptRepository.deleteById(id);
    }

    public Optional<StartupOpt> findByCategories(EBiotechCategory biotechCategory) {
        return startupOptRepository.findByCategories(biotechCategory);
    }

    public Optional<StartupOpt> findBySupportCategories(ESupportCategory supportCategory) {
        return startupOptRepository.findBySupportCategories(supportCategory);
    }

    public Optional<StartupOpt> findByTitle(String title) {
        return startupOptRepository.findByTitle(title);
    }

    public Optional<StartupOpt> findByProvider(String organizer) {
        return startupOptRepository.findByProvider(organizer);
    }

    public Optional<StartupOpt> findByStartDate(Date startDate) {
        return startupOptRepository.findByStartDate(startDate);
    }

    public Optional<SkillOpt> findByEndDate(Date endDate) {
        return startupOptRepository.findByEndDate(endDate);
    }
}
