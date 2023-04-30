package cz.utb.fai.howtodobiotech.repositories.content;

import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import cz.utb.fai.howtodobiotech.utils.enums.EExpertCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public interface BiotechExpertRepository extends JpaRepository<BiotechExpert, Integer> {
    @Query("SELECT s FROM BiotechExpert s JOIN s.expertises sc WHERE sc.name = :expertiseName")
    List<BiotechExpert> findByExpertiseName(@Param("expertiseName") EExpertCategory expertiseName);

    @Query("SELECT s FROM BiotechExpert s JOIN s.countries sc WHERE sc.name = :countryName")
    List<BiotechExpert> findByCountryName(@Param("countryName") ECountry countryName);

    Optional<BiotechExpert> findByLastName(String lastName);
}
