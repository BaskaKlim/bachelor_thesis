package cz.utb.fai.howtodobiotech.repositories.categories;

import cz.utb.fai.howtodobiotech.models.categories.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CountryRepository extends JpaRepository<Country, Integer> {
    Optional<Country> findByName(String name);

    Optional<Country> findById(Integer id);
}
