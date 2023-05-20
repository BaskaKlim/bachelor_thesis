package cz.utb.fai.howtodobiotech.repositories.categories;

import cz.utb.fai.howtodobiotech.models.categories.ContentType;
import cz.utb.fai.howtodobiotech.utils.enums.EContentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContentTypeRepository extends JpaRepository<ContentType, Integer> {
    Optional<ContentType> findByType(EContentType contentType);
}
