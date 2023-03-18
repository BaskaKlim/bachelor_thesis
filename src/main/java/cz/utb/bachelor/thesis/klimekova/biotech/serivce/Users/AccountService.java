package cz.utb.bachelor.thesis.klimekova.biotech.serivce.Users;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.Account;
import cz.utb.bachelor.thesis.klimekova.biotech.repository.Users.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {

    AccountRepository accountRepository;

    @Autowired
    public AccountService (AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Optional<Account> getAccountById(UUID id) {
        return accountRepository.findById(id);
    }

    public Account addAccount(Account account) {
        return  accountRepository.save(account);

    }

    public void deleteAccountById(UUID id) {
        accountRepository.deleteById(id);
    }

    public Account updateAccount(Account account) {
        return accountRepository.save(account);
    }
    public List<Account> getAllAccount() {
        List<Account> accounts = new ArrayList<Account>();
        accountRepository.findAll().forEach(accounts::add);

        return accounts;
    }
}
