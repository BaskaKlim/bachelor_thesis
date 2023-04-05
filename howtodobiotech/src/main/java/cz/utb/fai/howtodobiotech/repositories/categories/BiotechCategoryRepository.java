package cz.utb.fai.howtodobiotech.repositories.categories;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BiotechCategoryRepository extends JpaRepository<BiotechCategory,Integer> {

}
