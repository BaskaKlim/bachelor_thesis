package cz.utb.bachelor.thesis.klimekova.biotech.repository.Users;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
