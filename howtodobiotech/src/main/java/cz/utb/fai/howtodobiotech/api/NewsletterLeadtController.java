package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.models.users.Contact;
import cz.utb.fai.howtodobiotech.models.users.NewsletterLead;
import cz.utb.fai.howtodobiotech.services.users.NewsletterLeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/newsletterleads")
@RestController
public class NewsletterLeadtController {
    @Autowired
    NewsletterLeadService newsletterLeadService;

    @GetMapping("/{id}")
    public ResponseEntity<NewsletterLead> selectNewsletterLeadById(@PathVariable("id") Integer id) {
        Optional<NewsletterLead> contactData = newsletterLeadService.getNewsletterLeadById(id);

        if (contactData.isPresent()) {
            return new ResponseEntity<>(contactData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping()
    public ResponseEntity<List<NewsletterLead>> getAllNewsletterLeads() {
        try {
            List<NewsletterLead> newsletterLeads = new ArrayList<>();

            newsletterLeadService.getAllNewsletterLeads().forEach(newsletterLeads::add);
            if (newsletterLeads.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(newsletterLeads, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping()
    public ResponseEntity<NewsletterLead> createContact(@RequestBody NewsletterLead newsletterLead) {
        try {
            NewsletterLead _newsletterLead = newsletterLeadService
                    .addNewsletterLead(new NewsletterLead(newsletterLead.getFirstName(), newsletterLead.getLastName(), newsletterLead.getEmail(), newsletterLead.getCategories(), newsletterLead.getContentTypes()));
            return new ResponseEntity<>(_newsletterLead, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteNewsletterLead(@PathVariable("id") Integer id) {
        try {
            newsletterLeadService.deleteNewsletterLeadById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
