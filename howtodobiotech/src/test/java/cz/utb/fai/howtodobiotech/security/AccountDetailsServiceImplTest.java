package cz.utb.fai.howtodobiotech.security;

import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.repositories.users.AccountRepository;
import cz.utb.fai.howtodobiotech.security.services.AccountDetailsImpl;
import cz.utb.fai.howtodobiotech.security.services.AccountDetailsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AccountDetailsServiceImplTest {

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountDetailsServiceImpl accountDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoadUserByUsername_UserFound() {
        String username = "johnwick";
        Account account = new Account();
        account.setUsername(username);

        when(accountRepository.findByUsername(username)).thenReturn(Optional.of(account));
        UserDetails userDetails = accountDetailsService.loadUserByUsername(username);

        assertNotNull(userDetails);
        assertEquals(username, userDetails.getUsername());
        verify(accountRepository, times(1)).findByUsername(username);
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        String username = "johnwick";
        when(accountRepository.findByUsername(username)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> accountDetailsService.loadUserByUsername(username));
        verify(accountRepository, times(1)).findByUsername(username);
    }
}
