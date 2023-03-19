package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Content.StartupOpt;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Content.StartupOptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StartupOptService {
    StartupOptRepository startupOptRepository;


    @Autowired
    public StartupOptService(StartupOptRepository skillOptRepository) {
        this.startupOptRepository = skillOptRepository;
    }

    public Optional<StartupOpt> getStartupOptById(UUID id) {
        return startupOptRepository.findById(id);
    }

    public StartupOpt addStartupOpt(StartupOpt startupOpt) {
        return startupOptRepository.save(startupOpt);
    }

    public void deleteStartupOptById(UUID id) {
        startupOptRepository.deleteById(id);
    }

    public StartupOpt updateStartupOpt(StartupOpt startupOpt) {
        return startupOptRepository.save(startupOpt);
    }

    public List<StartupOpt> getAllStartupOpts() {
        List<StartupOpt> startupOpts = new ArrayList<StartupOpt>();
        startupOptRepository.findAll().forEach(startupOpts::add);

        return startupOpts;
    }
    
}
