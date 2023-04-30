package cz.utb.fai.howtodobiotech.services.content;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.ExpertCategory;
import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.repositories.content.BiotechExpertRepository;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.EExpertCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class BiotechExpertService {
    BiotechExpertRepository biotechExpertRepository;

    @Autowired
    public BiotechExpertService(BiotechExpertRepository biotechExpertRepository) {
        this.biotechExpertRepository = biotechExpertRepository;
    }

    public Optional<BiotechExpert> selectBiotechExpertById(Integer id) {
        return biotechExpertRepository.findById(id);
    }
    public List<BiotechExpert> selectAllBiotechExperts() {
        List<BiotechExpert> experts = new ArrayList<>();
        biotechExpertRepository.findAll().forEach(experts::add);

        return experts;
    }

    public BiotechExpert insertBiotechExpert(BiotechExpert expert) {
        return biotechExpertRepository.save(expert);

    }

    @Transactional
    public void updateBiotechExpert(Integer id, BiotechExpert expertDto) {
        BiotechExpert biotechExpert = biotechExpertRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("BiotechExpert not found with id: " + id));
        Set<Country> countries = expertDto.getCountries();
        Set<ExpertCategory> expertises = expertDto.getExpertises();

        biotechExpert.setFirstName(expertDto.getFirstName());
        biotechExpert.setLastName(expertDto.getLastName());
        biotechExpert.setEmail(expertDto.getEmail());
        biotechExpert.setJobPosition(expertDto.getJobPosition());
        biotechExpert.setLinkedinUrl(expertDto.getLinkedinUrl());
        biotechExpert.setBackgroundDescription(expertDto.getBackgroundDescription());
        biotechExpert.setCountries(countries);
        biotechExpert.setExpertises(expertises);
        biotechExpertRepository.save(biotechExpert);
    }

    public void deleteBiotechExpertById(Integer id) {
        biotechExpertRepository.deleteById(id);
    }


    public Optional<BiotechExpert> selectBiotechExpertByLastName(String lastName) {
        return biotechExpertRepository.findByLastName(lastName);
    }

    public List<BiotechExpert> selectBiotechExpertByExpertise(EExpertCategory expertiseName) {
        return biotechExpertRepository.findByExpertiseName(expertiseName);
    }
    public List<BiotechExpert> selectBiotechExpertByCountry(ECountry countryName) {
        return biotechExpertRepository.findByCountryName(countryName);
    }
}
