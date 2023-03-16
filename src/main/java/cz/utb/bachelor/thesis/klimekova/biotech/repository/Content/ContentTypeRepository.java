package cz.utb.bachelor.thesis.klimekova.biotech.repository.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Content.ContentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentTypeRepository extends JpaRepository<ContentType, Integer> {

}
