package cz.utb.fai.howtodobiotech.repositories.content;


import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ESkillCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface SkillOptRepository extends JpaRepository<SkillOpt, Integer> {
    Optional<SkillOpt> findByCategories (EBiotechCategory biotechCategory);
    Optional<SkillOpt> findBySkill (ESkillCategory skillCategory);
    Optional<SkillOpt> findByTitle (String title);

    Optional<SkillOpt> findByOrganizer (String organizer);

    Optional<SkillOpt> findByStartDate(Date startDate);

    Optional<SkillOpt> findByEndDate (Date endDate);
}
