package cz.utb.fai.howtodobiotech.repositories.content;

import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.models.content.StartupOpt;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ESkillCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ESupportCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface StartupOptRepository extends JpaRepository<StartupOpt, Integer> {

    Optional<StartupOpt> findByCategories (EBiotechCategory biotechCategory);


    Optional<StartupOpt> findBySupportCategories (ESupportCategory supportCategory);
    Optional<StartupOpt> findByTitle (String title);

    Optional<StartupOpt> findByProvider (String organizer);

    Optional<StartupOpt> findByStartDate(Date startDate);

    Optional<SkillOpt> findByEndDate (Date endDate);
}
