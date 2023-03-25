package cz.utb.bachelor.thesis.klimekova.biotech.api.Users;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.NewsletterLead;
import cz.utb.bachelor.thesis.klimekova.biotech.serivce.Users.NewsletterLeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/leads")
@RestController

public class NewsletterLeadController {

    @Autowired
    NewsletterLeadService newsletterLeadService;


    @GetMapping()
    public ResponseEntity<List<NewsletterLead>> getAllLeads() {
        try {
            List<NewsletterLead> newsletterLeads = new ArrayList<>();

            newsletterLeadService.getAllNewsletterLead().forEach(newsletterLeads::add);
            if (newsletterLeads.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(newsletterLeads, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<NewsletterLead> getLeadById(@PathVariable("id") UUID id) {
        Optional<NewsletterLead> contactData = newsletterLeadService.getNewsletterLeadById(id);

        if (contactData.isPresent()) {
            return new ResponseEntity<>(contactData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping()
    public ResponseEntity<NewsletterLead> createLead(@RequestBody NewsletterLead newsletterLead) {
        try {
            NewsletterLead _newsletterLead = newsletterLeadService
                    .addNewsletterLead(new NewsletterLead(newsletterLead.getFirstName(), newsletterLead.getLastName(), newsletterLead.getEmail(), newsletterLead.getCategories(), newsletterLead.getContentTypes()));
            return new ResponseEntity<>(_newsletterLead, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
