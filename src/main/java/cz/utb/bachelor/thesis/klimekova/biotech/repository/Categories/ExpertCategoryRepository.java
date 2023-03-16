package cz.utb.bachelor.thesis.klimekova.biotech.repository.Categories;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.ExpertCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpertCategoryRepository  extends JpaRepository<ExpertCategory,Integer>{

}
