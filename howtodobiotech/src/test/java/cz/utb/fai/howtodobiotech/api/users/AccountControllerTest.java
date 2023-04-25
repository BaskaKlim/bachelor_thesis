package cz.utb.fai.howtodobiotech.api.users;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.client.ExpectedCount.times;

import java.util.*;

import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.models.users.Contact;
import cz.utb.fai.howtodobiotech.models.users.Role;
import cz.utb.fai.howtodobiotech.services.users.AccountService;
import cz.utb.fai.howtodobiotech.utils.enums.ERole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AccountControllerTest {

    @Mock
    private AccountService accountService;
    @InjectMocks
    private AccountController accountController;
    private List<Account> accountList = new ArrayList<>();

    private Account account1;
    private Account account2;

    @BeforeEach
    void setUp() {

        Set<Role> roles = new HashSet<>();
        Role role1 = new Role(1, ERole.ROLE_ADMIN);
        Role role2 = new Role(2, ERole.ROLE_ADMIN);
        roles.add(role1);
        roles.add(role2);

        Set<Contact> contacts = new HashSet<>();
        Contact contact1 = new Contact("John", "Doe", "+1234567890", "john@test.com", "Manager", 1);
        Contact contact2 = new Contact("Jane", "Doe", "+0987654321", "jane@test.com", "Coordinator", 2);
        contacts.add(contact1);
        contacts.add(contact2);

        account1 = new Account(1, "Test Account 1", "This is a test account", "http://testaccount1.com", "testaccount1@example.com", "testuser1", "testpassword1", roles, contacts);
        account2 = new Account(2, "Test Account 2", "This is another test account", "http://testaccount2.com", "testaccount2@example.com", "testuser2", "testpassword2", roles, contacts);

        accountList.add(account1);
        accountList.add(account2);
    }

    @Test
    void testGetAllAccounts() {
        when(accountService.getAllAccounts()).thenReturn(accountList);

        ResponseEntity<List<Account>> responseEntity = accountController.getAllAccounts();
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        List<Account> responseAccounts = responseEntity.getBody();
        assertNotNull(responseAccounts);
        assertEquals(accountList.size(), responseAccounts.size());
    }

    @Test
    void testGetAllAccountsNoContent() {
        when(accountService.getAllAccounts()).thenReturn(new ArrayList<>());

        ResponseEntity<List<Account>> responseEntity = accountController.getAllAccounts();
        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
    }

    @Test
    void testSelectUserById() {
        when(accountService.getAccountById(1)).thenReturn(Optional.of(accountList.get(0)));

        ResponseEntity<Account> responseEntity = accountController.selectUserById(1);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        Account responseAccount = responseEntity.getBody();
        assertNotNull(responseAccount);
        assertEquals(accountList.get(0), responseAccount);
    }

    @Test
    void testSelectUserByIdNotFound() {
        when(accountService.getAccountById(3)).thenReturn(Optional.empty());

        ResponseEntity<Account> responseEntity = accountController.selectUserById(3);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testCreateAccount() {
        when(accountService.addAccount(account1)).thenReturn(account1);

        ResponseEntity<Account> responseEntity = accountController.createAccount(account1);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

        Account responseAccount = responseEntity.getBody();
        assertNotNull(responseAccount);
        assertEquals(3, responseAccount.getId());
    }

    @Test
    void testDeleteAccount() {
        Integer accountId = 1;
        doNothing().when(accountService).deleteAccountById(accountId);

        ResponseEntity<Boolean> responseEntity = accountController.deleteAccount(accountId);
        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody());
    }

    @Test
    void testUpdateAccount() {

        // Add the account to the database
        Account addedAccount = accountController.createAccount(account2).getBody();

        // Update the account with new values
        addedAccount.setName("Updated Account");
        addedAccount.setDescription("Updated Description");

        // Send a PUT request to update the account
        ResponseEntity<Account> response = accountController.updateAccount(addedAccount.getId(), addedAccount);

        // Check that the response has status 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Check that the account was updated correctly
        Optional<Account> updatedAccount = accountService.getAccountById(addedAccount.getId());
        assertTrue(updatedAccount.isPresent());
        assertEquals("Updated Account", updatedAccount.get().getName());
        assertEquals("Updated Description", updatedAccount.get().getDescription());

        // Delete the account from the database
        accountService.deleteAccountById(addedAccount.getId());
    }

    @Test
    void testDeleteAccountError() {
        // Arrange
        Integer accountId = 123;
        String expectedErrorMessage = "Failed to delete account with id " + accountId;

        doThrow(new RuntimeException(expectedErrorMessage))
                .when(accountService).deleteAccountById(accountId);

        // Act
        ResponseEntity<Boolean> response = accountController.deleteAccount(accountId);

        // Assert
        verify( times(1));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertNull(response.getBody());
        assertEquals(expectedErrorMessage, response.getHeaders().get("error-message").get(0));
    }
}
