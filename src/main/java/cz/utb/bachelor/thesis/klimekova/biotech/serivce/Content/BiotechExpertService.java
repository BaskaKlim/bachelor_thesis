package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Content.BiotechExpert;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Content.BiotechExpertRepository;
import cz.utb.bachelor.thesis.klimekova.biotech.utils.enums.EExpertCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BiotechExpertService {

    BiotechExpertRepository biotechExpertRepository;

    @Autowired
    public BiotechExpertService (BiotechExpertRepository biotechExpertRepository) {
        this.biotechExpertRepository = biotechExpertRepository;
    }

    public Optional<BiotechExpert> getBiotechExpertById(Integer id) {
        return biotechExpertRepository.findById(id);
    }

    public BiotechExpert addBiotechExpert(BiotechExpert biotechExpert) {
        return  biotechExpertRepository.save(biotechExpert);
    }
    public void deleteBiotechExpertById(Integer id) {
        biotechExpertRepository.deleteById(id);
    }

    public BiotechExpert updateBiotechExpert(BiotechExpert biotechExpert) {
        return biotechExpertRepository.save(biotechExpert);
    }
    public List<BiotechExpert> getAllBiotechExpert() {
        List<BiotechExpert> biotechExperts = new ArrayList<>();
        biotechExpertRepository.findAll().forEach(biotechExperts::add);

        return biotechExperts;
    }

    //TODO: add logic to get all experts with specific expertise
/*
    public List<BiotechExpert> getExpertsByExpertise(EExpertCategory expertise) {
        List<BiotechExpert> biotechExperts = biotechExpertRepository.findAll();

        return biotechExperts.stream().filter(expert -> expert.getExpertise().equals(expertise))
                .collect(Collectors.toList());
    }
*/
}
