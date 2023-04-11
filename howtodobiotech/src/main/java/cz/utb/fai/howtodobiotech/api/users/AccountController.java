package cz.utb.fai.howtodobiotech.api.users;

import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.services.users.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/accounts")
@RestController
public class AccountController {
    @Autowired
    AccountService accountService;

    @GetMapping()
    public ResponseEntity<List<Account>> getAllAccounts() {
        try {
            List<Account> accounts = new ArrayList<>();

            accountService.getAllAccounts().forEach(accounts::add);
            if (accounts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(accounts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> selectUserById(@PathVariable("id") Integer id) {
        Optional<Account> accountData = accountService.getAccountById(id);

        if (accountData.isPresent()) {
            return new ResponseEntity<>(accountData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        try {
            Account _account = accountService
                    .addAccount(new Account(account.getName(), account.getDescription(), account.getUrl(), account.getEmail(), account.getUsername(), account.getPassword(), account.getRoles(), account.getContacts()));
            return new ResponseEntity<>(_account, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteAccount(@PathVariable("id") Integer id) {
        try {
            accountService.deleteAccountById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable("id") Integer id, @RequestBody Account account) {
        Optional<Account> accountData = accountService.getAccountById(id);
        if (accountData.isPresent()) {
            Account _account = accountData.get();
            _account.setName(account.getName());
            _account.setDescription(account.getDescription());
            _account.setUrl(account.getUrl());
            _account.setEmail(account.getEmail());
            _account.setUsername(account.getUsername());
            _account.setPassword(account.getPassword());
            _account.setRoles(account.getRoles());
            _account.setContacts(account.getContacts());

            return new ResponseEntity<>(accountService.updateUser(_account), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
