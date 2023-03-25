package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Users;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.Contact;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Users.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContactService  {
    ContactRepository contactRepository;

    @Autowired
    public ContactService (ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public Optional<Contact> getContactById(UUID id) {
        return contactRepository.findById(id);
    }

    //TODO: add logic linking Accoount to Contact
    public Contact addContact(Contact account) {
        return  contactRepository.save(account);

    }

    public void deleteContactById(UUID id) {
        contactRepository.deleteById(id);
    }

    public Contact updateContact(Contact account) {
        return contactRepository.save(account);
    }
    public List<Contact> getAllContact() {
        List<Contact> accounts = new ArrayList<Contact>();
        contactRepository.findAll().forEach(accounts::add);

        return accounts;
    }
}
