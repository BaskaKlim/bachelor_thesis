package cz.utb.bachelor.thesis.klimekova.biotech.repository.Content;


import cz.utb.bachelor.thesis.klimekova.biotech.model.Content.SkillOpt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SkillOptRepository extends JpaRepository<SkillOpt, Integer> {

}
