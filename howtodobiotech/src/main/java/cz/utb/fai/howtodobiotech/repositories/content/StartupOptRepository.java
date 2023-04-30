package cz.utb.fai.howtodobiotech.repositories.content;

import cz.utb.fai.howtodobiotech.models.content.StartupOpt;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.ESupportCategory;
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
public interface StartupOptRepository extends JpaRepository<StartupOpt, Integer> {

    @Query("SELECT s FROM StartupOpt s JOIN s.categories sc WHERE sc.name = :categoryName")
    List<StartupOpt> findByCategoryName(@Param("categoryName") EBiotechCategory categoryName);

    @Query("SELECT s FROM StartupOpt s JOIN s.supportCategories sc WHERE sc.name = :supportCategoryName")
    List<StartupOpt> findBySupportCategoryName(@Param("supportCategoryName") ESupportCategory supportCategoryName);

    @Query("SELECT s FROM StartupOpt s JOIN s.countries sc WHERE sc.name = :countryName")
    List<StartupOpt> findByCountryName(@Param("countryName") ECountry countryName);

    Optional<StartupOpt> findByTitle(String title);

    Optional<StartupOpt> findByProvider(String organizer);

    Optional<StartupOpt> findByStartDate(Date startDate);

    Optional<StartupOpt> findByEndDate(Date endDate);
}
