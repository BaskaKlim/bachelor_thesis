package cz.utb.fai.howtodobiotech.services.content;


import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.repositories.content.InnovationRepository;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class InnovationService {
    InnovationRepository innovationRepository;

    @Autowired
    public InnovationService(InnovationRepository innovationRepository) {
        this.innovationRepository = innovationRepository;
    }

    public Optional<Innovation> selectInnovationById(Integer id) {
        return innovationRepository.findById(id);
    }

    public List<Innovation> selectAllInnovations() {
        List<Innovation> innovations = new ArrayList<Innovation>();
        innovationRepository.findAll().forEach(innovations::add);

        return innovations;
    }

    public Innovation insertInnovation(Innovation innovation) {
        return innovationRepository.save(innovation);
    }

    @Transactional
    public void updateInnovation(Integer id, Innovation innovationDto) {
        Innovation innovation = innovationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Innovation not found with id: " + id));

        Set<Country> countries = innovationDto.getCountries();
        Set<BiotechCategory> categories = innovationDto.getCategories();

        innovation.setTitle(innovationDto.getTitle());
        innovation.setDescription(innovationDto.getDescription());
        innovation.setWebsite(innovationDto.getWebsite());
        innovation.setCountries(countries);
        innovation.setCategories(categories);
        innovationRepository.save(innovation);
    }

    public void deleteInnovationById(Integer id) {
        innovationRepository.deleteById(id);
    }

    public List<Innovation> selectInnovationByBiotechCategory(EBiotechCategory biotechCategoryName) {
        return innovationRepository.findByCategoryName(biotechCategoryName);
    }

    public List<Innovation> selectInnovationByCountry(ECountry countryName) {
        return innovationRepository.findByCountryName(countryName);
    }

    public Optional<Innovation> selectInnovationByTitle(String title) {
        return innovationRepository.findByTitle(title);
    }

}
