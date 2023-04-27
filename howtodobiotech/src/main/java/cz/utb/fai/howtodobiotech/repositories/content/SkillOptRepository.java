package cz.utb.fai.howtodobiotech.repositories.content;


import cz.utb.fai.howtodobiotech.models.categories.SkillCategory;
import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface SkillOptRepository extends JpaRepository<SkillOpt, Integer> {
    Optional<SkillOpt> findByBiotechCategories(EBiotechCategory biotechCategory);
    List<SkillOpt> findBySkillCategories (Optional<SkillCategory> skillCategory);
    Optional<SkillOpt> findByTitle (String title);

    Optional<SkillOpt> findByOrganizer (String organizer);

    Optional<SkillOpt> findByStartDate(Date startDate);

    Optional<SkillOpt> findByEndDate (Date endDate);
}
