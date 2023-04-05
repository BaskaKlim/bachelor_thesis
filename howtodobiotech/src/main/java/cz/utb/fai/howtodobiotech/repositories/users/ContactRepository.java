package cz.utb.fai.howtodobiotech.repositories.users;


import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.models.users.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {
    Optional<Contact> findByAccountId(Integer account);
}
