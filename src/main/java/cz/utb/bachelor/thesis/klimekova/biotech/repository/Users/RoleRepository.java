package cz.utb.bachelor.thesis.klimekova.biotech.repository.Users;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.Role;
import cz.utb.bachelor.thesis.klimekova.biotech.utils.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);

}
