package cz.utb.fai.howtodobiotech.repositories.content;

import cz.utb.fai.howtodobiotech.models.content.SkillOpt;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.ESkillCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Transactional
@Repository
public interface SkillOptRepository extends JpaRepository<SkillOpt, Integer> {
    @Query("SELECT s FROM SkillOpt s JOIN s.biotechCategories sc WHERE sc.name = :biotechCategoryName")
    List<SkillOpt> findByBiotechCategoryName(@Param("biotechCategoryName") EBiotechCategory biotechCategoryName);

    @Query("SELECT s FROM SkillOpt s JOIN s.skillCategories sc WHERE sc.name = :skillCategoryName")
    List<SkillOpt> findBySkillCategoryName(@Param("skillCategoryName") ESkillCategory skillCategoryName);

    @Query("SELECT s FROM SkillOpt s JOIN s.countries sc WHERE sc.name = :countryName")
    List<SkillOpt> findByCountryName(@Param("countryName") ECountry countryName);

    @Query("SELECT so FROM SkillOpt so LEFT JOIN so.countries c LEFT JOIN so.biotechCategories bc LEFT JOIN so.skillCategories sc")
    List<SkillOpt> findAllWithDetails();

    Optional<SkillOpt> findByTitle(String title);

    Optional<SkillOpt> findByOrganizer(String organizer);

    Optional<SkillOpt> findByStartDate(Date startDate);

    Optional<SkillOpt> findByEndDate(Date endDate);

    List<SkillOpt> findByAccountId(Integer accountId);
}
