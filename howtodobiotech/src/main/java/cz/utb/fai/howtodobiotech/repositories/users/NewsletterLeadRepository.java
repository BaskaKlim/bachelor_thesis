package cz.utb.fai.howtodobiotech.repositories.users;

import cz.utb.fai.howtodobiotech.models.users.NewsletterLead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsletterLeadRepository extends JpaRepository<NewsletterLead, Integer> {

}
