package cz.utb.fai.howtodobiotech.services;

import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.repositories.users.AccountRepository;
import cz.utb.fai.howtodobiotech.services.users.AccountService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountService accountService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAccountById_ExistingAccount() {
        int accountId = 1;
        Account account = new Account();
        account.setId(accountId);

        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        Optional<Account> result = accountService.getAccountById(accountId);

        assertTrue(result.isPresent());
        assertEquals(account, result.get());
        verify(accountRepository, times(1)).findById(accountId);
    }

    @Test
    void testGetAccountById_NonExistingAccount() {
        int accountId = 1;
        when(accountRepository.findById(accountId)).thenReturn(Optional.empty());
        Optional<Account> result = accountService.getAccountById(accountId);

        assertFalse(result.isPresent());
        verify(accountRepository, times(1)).findById(accountId);
    }

    @Test
    void testGetAllAccounts() {
        List<Account> accounts = new ArrayList<>();
        Account account1 = new Account();
        Account account2 = new Account();
        accounts.add(account1);
        accounts.add(account2);

        when(accountRepository.findAll()).thenReturn(accounts);
        List<Account> result = accountService.getAllAccounts();

        assertEquals(accounts.size(), result.size());
        assertTrue(result.contains(account1));
        assertTrue(result.contains(account2));
        verify(accountRepository, times(1)).findAll();
    }

    @Test
    void testAddAccount() {
        Account account = new Account();
        when(accountRepository.save(account)).thenReturn(account);
        Account result = accountService.addAccount(account);

        assertEquals(account, result);
        verify(accountRepository, times(1)).save(account);
    }

    @Test
    void testUpdateAccount() {
        Account account = new Account();
        when(accountRepository.save(account)).thenReturn(account);
        Account result = accountService.updateAccount(account);

        assertEquals(account, result);
        verify(accountRepository, times(1)).save(account);
    }

    @Test
    void testDeleteAccountById() {
        int accountId = 1;
        accountService.deleteAccountById(accountId);

        verify(accountRepository, times(1)).deleteById(accountId);
    }

    @Test
    void testFindByUsername_ExistingAccount() {
        String username = "testuser";
        Account account = new Account();
        account.setUsername(username);

        when(accountRepository.findByUsername(username)).thenReturn(Optional.of(account));

        Optional<Account> result = accountService.findByUsername(username);

        assertTrue(result.isPresent());
        assertEquals(account, result.get());
        verify(accountRepository, times(1)).findByUsername(username);
    }

    @Test
    void testFindByUsername_NonExistingAccount() {
        String username = "testuser";
        when(accountRepository.findByUsername(username)).thenReturn(Optional.empty());
        Optional<Account> result = accountService.findByUsername(username);

        assertFalse(result.isPresent());
        verify(accountRepository, times(1)).findByUsername(username);
    }

    @Test
    void testExistsByUsername_ExistingUsername() {
        String username = "testuser";
        when(accountRepository.existsByUsername(username)).thenReturn(true);
        boolean result = accountService.existsByUsername(username);

        assertTrue(result);
        verify(accountRepository, times(1)).existsByUsername(username);
    }

    @Test
    void testExistsByUsername_NonExistingUsername() {
        String username = "testuser";
        when(accountRepository.existsByUsername(username)).thenReturn(false);
        boolean result = accountService.existsByUsername(username);

        assertFalse(result);
        verify(accountRepository, times(1)).existsByUsername(username);
    }

    @Test
    void testExistsByEmail_ExistingEmail() {
        String email = "test@test.com";
        when(accountRepository.existsByEmail(email)).thenReturn(true);
        boolean result = accountService.existsByEmail(email);

        assertTrue(result);
        verify(accountRepository, times(1)).existsByEmail(email);
    }

    @Test
    void testExistsByEmail_NonExistingEmail() {
        String email = "test@test.com";
        when(accountRepository.existsByEmail(email)).thenReturn(false);
        boolean result = accountService.existsByEmail(email);

        assertFalse(result);
        verify(accountRepository, times(1)).existsByEmail(email);
    }
}
