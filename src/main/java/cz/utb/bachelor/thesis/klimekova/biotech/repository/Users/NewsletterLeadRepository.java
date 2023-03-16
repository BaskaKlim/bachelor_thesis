package cz.utb.bachelor.thesis.klimekova.biotech.repository.Users;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.NewsletterLead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NewsletterLeadRepository extends JpaRepository<NewsletterLead, UUID> {

}
