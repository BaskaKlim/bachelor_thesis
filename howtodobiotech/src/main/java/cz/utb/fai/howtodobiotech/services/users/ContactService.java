package cz.utb.fai.howtodobiotech.services.users;

import cz.utb.fai.howtodobiotech.models.users.Contact;
import cz.utb.fai.howtodobiotech.repositories.users.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public Optional<Contact> getContactById(Integer id) {
        return contactRepository.findById(id);
    }

    public List<Contact> getAllContacts() {
        List<Contact> accounts = new ArrayList<Contact>();
        contactRepository.findAll().forEach(accounts::add);

        return accounts;
    }

    public Contact addContact(Contact account) {
        return contactRepository.save(account);

    }

    public Contact updateContact(Contact account) {
        return contactRepository.save(account);
    }

    public void deleteContactById(Integer id) {
        contactRepository.deleteById(id);
    }

}
