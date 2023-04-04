package cz.utb.bachelor.thesis.klimekova.biotech.api.Users;


import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.Contact;
import cz.utb.bachelor.thesis.klimekova.biotech.serivce.Users.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/contacts")
@RestController
public class ContactController {

    @Autowired
    ContactService contactService;


    @GetMapping()
    public ResponseEntity<List<Contact>> getAllContacts() {
        try {
            List<Contact> contacts = new ArrayList<>();

            contactService.getAllContact().forEach(contacts::add);
            if (contacts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(contacts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable("id") Integer id) {
        Optional<Contact> contactData = contactService.getContactById(id);

        if (contactData.isPresent()) {
            return new ResponseEntity<>(contactData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping()
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        try {
            Contact _contact = contactService
                    .addContact(new Contact(contact.getFirstName(), contact.getLastName(), contact.getPhone(), contact.getEmail(), contact.getJobPosition()));
            return new ResponseEntity<>(_contact, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
