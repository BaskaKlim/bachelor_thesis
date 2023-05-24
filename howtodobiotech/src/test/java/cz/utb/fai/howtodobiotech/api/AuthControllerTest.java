package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.api.users.AuthController;
import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.models.users.Role;
import cz.utb.fai.howtodobiotech.payload.request.LoginRequest;
import cz.utb.fai.howtodobiotech.payload.request.SignupRequest;
import cz.utb.fai.howtodobiotech.payload.response.AuthResponse;
import cz.utb.fai.howtodobiotech.payload.response.MessageResponse;
import cz.utb.fai.howtodobiotech.repositories.users.RoleRepository;
import cz.utb.fai.howtodobiotech.security.jwt.JwtUtils;
import cz.utb.fai.howtodobiotech.security.services.AccountDetailsImpl;
import cz.utb.fai.howtodobiotech.services.users.AccountService;
import cz.utb.fai.howtodobiotech.utils.enums.ERole;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AuthControllerTest {
    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AccountService accountService;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private HttpServletResponse response;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAuthenticateWithValidCredentials() {
        String username = "user1";
        String password = "password";
        String token = "sample_token";
        Integer userId = 1;

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(username);
        loginRequest.setPassword(password);

        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);

        when(jwtUtils.generateToken(username)).thenReturn(token);

        AccountDetailsImpl userDetails = mock(AccountDetailsImpl.class);
        when(userDetailsService.loadUserByUsername(username)).thenReturn(userDetails);
        when(userDetails.getId()).thenReturn(userId);

        ResponseEntity<AuthResponse> responseEntity = authController.authenticate(loginRequest, response);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(token, responseEntity.getBody().getToken());
        assertEquals(userId, responseEntity.getBody().getUserId());

        verify(response).setHeader("Authorization", "Bearer " + token);
        verify(response).setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
        verify(response).setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        verify(response).setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization");
    }
    @Test
    void testAuthenticateWithError() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("user1");
        loginRequest.setPassword("password");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenThrow(RuntimeException.class);

        ResponseEntity<AuthResponse> responseEntity = authController.authenticate(loginRequest, response);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals(null, responseEntity.getBody());

        verify(response, never()).setHeader(anyString(), anyString());
    }

    @Test
    void testRegisterAccountWithExistingUsername() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setName("User 1");
        signupRequest.setDescription("User description");
        signupRequest.setUrl("http://example.com");
        signupRequest.setEmail("user1@example.com");
        signupRequest.setUsername("user1");
        signupRequest.setPassword("password");
        signupRequest.setRole(Collections.singleton("user"));

        when(accountService.existsByUsername(signupRequest.getUsername())).thenReturn(true);

        ResponseEntity<?> responseEntity = authController.registerAccount(signupRequest, response);

        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals(MessageResponse.class, responseEntity.getBody().getClass());
        assertEquals("Error: Username is already taken!", ((MessageResponse) responseEntity.getBody()).getMessage());

        verify(accountService).existsByUsername(signupRequest.getUsername());
        verify(accountService, never()).existsByEmail(signupRequest.getEmail());
        verify(accountService, never()).updateAccount(any(Account.class));
        verify(roleRepository, never()).findByName(any(ERole.class));
        verify(response, never()).addHeader(anyString(), anyString());
    }

    @Test
    void testRegisterAccountWithExistingEmail() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setName("User 1");
        signupRequest.setDescription("User description");
        signupRequest.setUrl("http://example.com");
        signupRequest.setEmail("user1@example.com");
        signupRequest.setUsername("user1");
        signupRequest.setPassword("password");
        signupRequest.setRole(Collections.singleton("user"));

        when(accountService.existsByUsername(signupRequest.getUsername())).thenReturn(false);
        when(accountService.existsByEmail(signupRequest.getEmail())).thenReturn(true);

        ResponseEntity<?> responseEntity = authController.registerAccount(signupRequest, response);

        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals(MessageResponse.class, responseEntity.getBody().getClass());
        assertEquals("Error: Email is already in use!", ((MessageResponse) responseEntity.getBody()).getMessage());

        verify(accountService).existsByUsername(signupRequest.getUsername());
        verify(accountService).existsByEmail(signupRequest.getEmail());
        verify(accountService, never()).updateAccount(any(Account.class));
        verify(roleRepository, never()).findByName(any(ERole.class));
        verify(response, never()).addHeader(anyString(), anyString());
    }

}
