package cz.utb.bachelor.thesis.klimekova.biotech.repository.Users;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

}
