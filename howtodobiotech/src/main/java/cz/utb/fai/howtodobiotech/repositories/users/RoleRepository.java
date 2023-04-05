package cz.utb.fai.howtodobiotech.repositories.users;

import cz.utb.fai.howtodobiotech.models.users.Role;
import cz.utb.fai.howtodobiotech.utils.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);

}
