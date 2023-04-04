package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Content.Innovation;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Content.InnovationRepository;
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

    public Innovation addInnovation(Innovation innovation) {
        return innovationRepository.save(innovation);
    }

    public void deleteInnovationById(Integer id) {
        innovationRepository.deleteById(id);
    }

    public Innovation updateInnovation(Innovation innovation) {
        return innovationRepository.save(innovation);
    }

    public List<Innovation> getAllInnovations() {
        List<Innovation> innovations = new ArrayList<Innovation>();
        innovationRepository.findAll().forEach(innovations::add);

        return innovations;
    }

}
