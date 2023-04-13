package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.models.users.Account;
import cz.utb.fai.howtodobiotech.models.users.Role;
import cz.utb.fai.howtodobiotech.payload.request.LoginRequest;
import cz.utb.fai.howtodobiotech.payload.request.SignupRequest;
import cz.utb.fai.howtodobiotech.payload.response.AccountInfoResponse;
import cz.utb.fai.howtodobiotech.payload.response.MessageResponse;
import cz.utb.fai.howtodobiotech.repositories.users.AccountRepository;
import cz.utb.fai.howtodobiotech.repositories.users.RoleRepository;
import cz.utb.fai.howtodobiotech.security.jwt.JwtUtils;
import cz.utb.fai.howtodobiotech.security.services.AccountDetailsImpl;
import cz.utb.fai.howtodobiotech.utils.enums.ERole;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        AccountDetailsImpl accountDetails = (AccountDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(accountDetails);

        List<String> roles = accountDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new AccountInfoResponse(accountDetails.getId(),
                        accountDetails.getName(),
                        accountDetails.getDescription(),
                        accountDetails.getUrl(),
                        accountDetails.getEmail(),
                        accountDetails.getUsername(),
                        roles,
                        accountDetails.getContacts()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (accountRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (accountRepository.existsByPassword(signUpRequest.getPassword())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Password is already in use!"));
        }

        // Create new account
        Role defaultRole = new Role();
        defaultRole.setId(2);
        defaultRole.setName(ERole.ROLE_USER);
        Account account = new Account(signUpRequest.getName(),
                signUpRequest.getDescription(),
                signUpRequest.getUrl(),
                signUpRequest.getEmail(),
                signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                Collections.singleton(defaultRole),
                signUpRequest.getContacts()
                );

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
                    case "user":
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
        accountRepository.save(account);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }
}
