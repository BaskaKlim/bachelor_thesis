package cz.utb.fai.howtodobiotech.repositories.content;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.content.ContentType;
import cz.utb.fai.howtodobiotech.models.content.Innovation;
import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import cz.utb.fai.howtodobiotech.utils.enums.EContentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InnovationRepository extends JpaRepository<Innovation, Integer> {
    Optional<Innovation> findByTitle (String title);
    Optional<Innovation> findByCategories (EBiotechCategory biotechCategory);


}
