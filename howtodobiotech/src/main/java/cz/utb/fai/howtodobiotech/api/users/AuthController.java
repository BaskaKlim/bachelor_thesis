package cz.utb.fai.howtodobiotech.api.users;
import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.models.users.Role;
import cz.utb.fai.howtodobiotech.payload.request.LoginRequest;
import cz.utb.fai.howtodobiotech.payload.request.SignupRequest;
import cz.utb.fai.howtodobiotech.payload.response.AuthResponse;
import cz.utb.fai.howtodobiotech.payload.response.MessageResponse;
import cz.utb.fai.howtodobiotech.repositories.users.RoleRepository;
import cz.utb.fai.howtodobiotech.security.jwt.JwtUtils;
import cz.utb.fai.howtodobiotech.services.users.AccountService;
import cz.utb.fai.howtodobiotech.utils.enums.ERole;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountService accountService;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateAccount(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            // Load the user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

            // Generate the authentication token
            String token = jwtUtils.generateToken(loginRequest.getUsername());

            // Return the token in the response
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (AuthenticationException e) {
            // Handle invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Invalid credentials"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerAccount(@Valid @RequestBody SignupRequest signUpRequest, HttpServletResponse response) {
        if (accountService.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (accountService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new account's account
        Account account = new Account(signUpRequest.getName(),
                signUpRequest.getDescription(),
                signUpRequest.getUrl(),
                signUpRequest.getEmail(),
                signUpRequest.getUsername(),
                passwordEncoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "account":
                        Role modRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_OBSERVER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        account.setRoles(roles);
        accountService.updateAccount(account);

        // Generate the authentication token
        String token = jwtUtils.generateToken(account.getUsername());

        // Add the token to the response header
        response.addHeader("Authorization", "Bearer " + token);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutAccount(HttpServletResponse response) {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(new MessageResponse("You've been signed out!"));
    }
}