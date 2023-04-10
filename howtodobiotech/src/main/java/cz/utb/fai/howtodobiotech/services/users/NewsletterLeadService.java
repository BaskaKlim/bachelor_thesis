package cz.utb.fai.howtodobiotech.services.users;

import cz.utb.fai.howtodobiotech.models.users.NewsletterLead;
import cz.utb.fai.howtodobiotech.repositories.users.NewsletterLeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class NewsletterLeadService  {

    NewsletterLeadRepository newsletterLeadRepository;

    @Autowired
    public NewsletterLeadService (NewsletterLeadRepository newsletterLeadRepository) {
        this.newsletterLeadRepository = newsletterLeadRepository;
    }

    public Optional<NewsletterLead> getNewsletterLeadById(Integer id) {
        return newsletterLeadRepository.findById(id);
    }

    public NewsletterLead addNewsletterLead(NewsletterLead newsletterLead) {
        return  newsletterLeadRepository.save(newsletterLead);

    }

    public void deleteNewsletterLeadById(Integer id) {
        newsletterLeadRepository.deleteById(id);
    }

    public NewsletterLead updateNewsletterLead(NewsletterLead newsletterLead) {
        return newsletterLeadRepository.save(newsletterLead);
    }
    public List<NewsletterLead> getAllNewsletterLeads() {
        List<NewsletterLead> newsletterLeads = new ArrayList<NewsletterLead>();
        newsletterLeadRepository.findAll().forEach(newsletterLeads::add);

        return newsletterLeads;
    }

}
