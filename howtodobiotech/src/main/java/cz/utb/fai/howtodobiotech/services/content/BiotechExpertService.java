package cz.utb.fai.howtodobiotech.services.content;

import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.repositories.content.BiotechExpertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BiotechExpertService {
    BiotechExpertRepository biotechExpertRepository;

    @Autowired
    public BiotechExpertService(BiotechExpertRepository biotechExpertRepository) {
        this.biotechExpertRepository = biotechExpertRepository;
    }

    public Optional<BiotechExpert> getBiotechExpertById(Integer id) {
        return biotechExpertRepository.findById(id);
    }

    public List<BiotechExpert> getAllBiotechExperts() {
        List<BiotechExpert> experts = new ArrayList<BiotechExpert>();
        biotechExpertRepository.findAll().forEach(experts::add);

        return experts;
    }

    public BiotechExpert addBiotechExpert(BiotechExpert expert) {
        return biotechExpertRepository.save(expert);

    }

    public BiotechExpert updateBiotechExpert(BiotechExpert expert) {
        return biotechExpertRepository.save(expert);
    }

    public void deleteBiotechExpertById(Integer id) {
        biotechExpertRepository.deleteById(id);
    }

}
