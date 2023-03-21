package cz.utb.bachelor.thesis.klimekova.biotech.api.Users;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.Account;
import cz.utb.bachelor.thesis.klimekova.biotech.serivce.Users.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/accounts")
@RestController
public class AccountController {

    @Autowired
    AccountService accountService;


    @GetMapping()
    public ResponseEntity<List<Account>> getAllAccount() {
        try {
            List<Account> users = new ArrayList<>();

            accountService.getAllAccount().forEach(users::add);
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable("id") UUID id) {
        Optional<Account> accountData = accountService.getAccountById(id);

        if (accountData.isPresent()) {
            return new ResponseEntity<>(accountData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
