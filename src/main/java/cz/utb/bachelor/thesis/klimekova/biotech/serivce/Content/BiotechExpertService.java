package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Content.BiotechExpert;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Content.BiotechExpertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BiotechExpertService {

    BiotechExpertRepository biotechExpertRepository;

    @Autowired
    public BiotechExpertService (BiotechExpertRepository biotechExpertRepository) {
        this.biotechExpertRepository = biotechExpertRepository;
    }

    public Optional<BiotechExpert> getBiotechExpertById(UUID id) {
        return biotechExpertRepository.findById(id);
    }

    public BiotechExpert addBiotechExpert(BiotechExpert biotechExpert) {
        return  biotechExpertRepository.save(biotechExpert);
    }
    public void deleteBiotechExpertById(UUID id) {
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
}
