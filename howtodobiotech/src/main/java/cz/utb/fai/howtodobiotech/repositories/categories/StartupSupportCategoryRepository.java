package cz.utb.fai.howtodobiotech.repositories.categories;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StartupSupportCategoryRepository extends JpaRepository<StartupSupportCategory, Integer> {
    Optional<StartupSupportCategory> findByName(String name);
    Optional<StartupSupportCategory> findById(Integer id);
}
