package cz.utb.fai.howtodobiotech.repositories.content;

import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.utils.enums.EExpertCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface BiotechExpertRepository extends JpaRepository<BiotechExpert, Integer> {
    Optional<BiotechExpert> findByName(String lastName);
    Optional<BiotechExpert> findByExpertise(EExpertCategory expertise);
}
