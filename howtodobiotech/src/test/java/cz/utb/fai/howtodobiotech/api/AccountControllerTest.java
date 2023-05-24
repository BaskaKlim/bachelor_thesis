package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.api.users.AccountController;
import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.security.jwt.JwtUtils;
import cz.utb.fai.howtodobiotech.services.users.AccountService;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AccountControllerTest {
    @Mock
    private AccountService accountService;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private AccountController accountController;

    @Test
    void shouldReturnAllAccounts() {
        List<Account> accounts = new ArrayList<>();
        Account account1 = new Account();
        account1.setId(1);
        account1.setUsername("user1");
        Account account2 = new Account();
        account2.setId(2);
        account2.setUsername("user2");
        accounts.add(account1);
        accounts.add(account2);

        when(accountService.getAllAccounts()).thenReturn(accounts);

        ResponseEntity<List<Account>> response = accountController.getAllAccounts();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(accounts, response.getBody());
    }

    @Test
    void shouldGetAccountById() {
        Integer id = 1;
        Account account = new Account();
        account.setId(id);
        account.setUsername("user1");

        when(accountService.getAccountById(id)).thenReturn(Optional.of(account));

        ResponseEntity<Account> response = accountController.getAccountById(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(account, response.getBody());
    }

    @Test
    void shouldUpdateAccount() {
        Integer id = 1;
        Account account = new Account();
        account.setId(id);
        account.setUsername("user1");

        Optional<Account> accountData = Optional.of(account);

        when(accountService.getAccountById(id)).thenReturn(accountData);
        when(accountService.updateAccount(account)).thenReturn(account);

        ResponseEntity<?> response = accountController.updateAccount(id, account);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(accountService).updateAccount(account);
    }
}
