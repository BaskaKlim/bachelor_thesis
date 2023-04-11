package cz.utb.fai.howtodobiotech.api.users;

import cz.utb.fai.howtodobiotech.models.users.Contact;
import cz.utb.fai.howtodobiotech.services.users.ContactService;
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

    @GetMapping("/{id}")
    public ResponseEntity<Contact> selectContactById(@PathVariable("id") Integer id) {
        Optional<Contact> contactData = contactService.getContactById(id);

        if (contactData.isPresent()) {
            return new ResponseEntity<>(contactData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping()
    public ResponseEntity<List<Contact>> getAllContacts() {
        try {
            List<Contact> contacts = new ArrayList<>();

            contactService.getAllContacts().forEach(contacts::add);
            if (contacts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(contacts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping()
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact, Integer accountId) {
        try {
            Contact _contact = contactService
                    .addContact(new Contact(contact.getFirstName(), contact.getLastName(), contact.getPhone(), contact.getEmail(), contact.getJobPosition(), accountId));
            return new ResponseEntity<>(_contact, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") Integer id) {
        try {
            contactService.deleteContactById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable("id") Integer id, @RequestBody Contact contact) {
        Optional<Contact> contactData = contactService.getContactById(id);
        if (contactData.isPresent()) {
            Contact _contact = contactData.get();
            _contact.setFirstName(contact.getFirstName());
            _contact.setLastName(contact.getLastName());
            _contact.setPhone(contact.getPhone());
            _contact.setEmail(contact.getEmail());
            _contact.setJobPosition(contact.getJobPosition());
            _contact.setAccountId(contact.getAccountId());


            return new ResponseEntity<>(contactService.updateContact(_contact), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
