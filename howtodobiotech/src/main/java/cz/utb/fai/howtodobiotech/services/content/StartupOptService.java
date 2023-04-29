package cz.utb.fai.howtodobiotech.services.content;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import cz.utb.fai.howtodobiotech.models.content.StartupOpt;
import cz.utb.fai.howtodobiotech.repositories.content.StartupOptRepository;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ESupportCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.util.*;

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
    @Transactional
    public void updateStartupOpt(Integer id, StartupOpt startupOptDto) {
        StartupOpt startupOpt = startupOptRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Startup opportunity not found with id: " + id));

        Set<Country> countries = startupOptDto.getCountries();
        Set<BiotechCategory> biotechCategories = startupOptDto.getCategories();
        Set<StartupSupportCategory> supportCategories = startupOptDto.getSupportCategories();

        startupOpt.setTitle(startupOptDto.getTitle());
        startupOpt.setProvider(startupOptDto.getProvider());
        startupOpt.setDescription(startupOptDto.getDescription());
        startupOpt.setStartDate(startupOptDto.getStartDate());
        startupOpt.setEndDate(startupOptDto.getEndDate());
        startupOpt.setWebsite(startupOptDto.getWebsite());
        startupOpt.setAccountId(startupOptDto.getAccountId());
        startupOpt.setCountries(countries);
        startupOpt.setCategories(biotechCategories);
        startupOpt.setSupportCategories(supportCategories);

        startupOptRepository.save(startupOpt);
    }

    public void deleteStartupOptById(Integer id) {
        startupOptRepository.deleteById(id);
    }

    public List<StartupOpt> selectStartupOptByBiotechCategory(EBiotechCategory biotechCategory) {
        return startupOptRepository.findByCategoryName(biotechCategory);
    }


    public List<StartupOpt> selectStartupOptBySupportCategory(ESupportCategory supportCategory) {
        return startupOptRepository.findBySupportCategoryName(supportCategory);
    }

    public Optional<StartupOpt> selectStartupOptByTitle(String title) {
        return startupOptRepository.findByTitle(title);
    }

    public Optional<StartupOpt> selectStartupOptByProvider(String organizer) {
        return startupOptRepository.findByProvider(organizer);
    }

    public Optional<StartupOpt> selectStartupOptByStartDate(Date startDate) {
        return startupOptRepository.findByStartDate(startDate);
    }

    public Optional<StartupOpt> selectStartupOptByEndDate(Date endDate) {
        return startupOptRepository.findByEndDate(endDate);
    }
}
