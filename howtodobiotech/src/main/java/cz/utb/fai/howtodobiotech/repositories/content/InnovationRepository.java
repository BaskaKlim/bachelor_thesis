package cz.utb.fai.howtodobiotech.repositories.content;

import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public interface InnovationRepository extends JpaRepository<Innovation, Integer> {
    @Query("SELECT s FROM Innovation s JOIN s.categories sc WHERE sc.name = :categoryName")
    List<Innovation> findByCategoryName(@Param("categoryName") EBiotechCategory biotechCategoryName);

    @Query("SELECT s FROM Innovation s JOIN s.countries sc WHERE sc.name = :countryName")
    List<Innovation> findByCountryName(@Param("countryName") ECountry countryName);

    Optional<Innovation> findByTitle(String title);


}
