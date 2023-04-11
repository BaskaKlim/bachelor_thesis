package cz.utb.fai.howtodobiotech.services.content;


import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.repositories.content.InnovationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InnovationService {
    InnovationRepository innovationRepository;

    @Autowired
    public InnovationService(InnovationRepository innovationRepository) {
        this.innovationRepository = innovationRepository;
    }


    public Optional<Innovation> getInnovationById(Integer id) {
        return innovationRepository.findById(id);
    }

    public List<Innovation> getAllInnovations() {
        List<Innovation> innovations = new ArrayList<Innovation>();
        innovationRepository.findAll().forEach(innovations::add);

        return innovations;
    }


    public Innovation addInnovation(Innovation innovation) {
        return innovationRepository.save(innovation);

    }

    public Innovation updateInnovation(Innovation innovation) {
        return innovationRepository.save(innovation);
    }

    public void deleteInnovationById(Integer id) {
        innovationRepository.deleteById(id);
    }

}
