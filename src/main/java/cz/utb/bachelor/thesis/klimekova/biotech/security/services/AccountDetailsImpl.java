package cz.utb.bachelor.thesis.klimekova.biotech.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.Account;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.Contact;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Users.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

public class AccountDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;


    private UUID id;
    private String name;
    private String description;
    private String url;
    private String email;
    private String username;

    @JsonIgnore
    private String password;

    private Set<Role> roles = new HashSet<>();
    private Set<Contact> contacts = new HashSet<>();
    private Collection<? extends GrantedAuthority> authorities;

    public AccountDetailsImpl(UUID id, String name, String description, String url, String email, String username, String password,
                              Set<Role> roles, Set<Contact> contacts, Collection<? extends GrantedAuthority> authorities) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.email = email;
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.contacts = contacts;
        this.authorities = authorities;
    }

    public static AccountDetailsImpl build(Account account) {
        List<GrantedAuthority> authorities = account.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new AccountDetailsImpl(
                account.getId(),
                account.getName(),
                account.getDescription(),
                account.getUrl(),
                account.getEmail(),
                account.getUsername(),
                account.getPassword(),
                account.getRoles(),
                account.getContacts(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public UUID getId() {
        return id;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        AccountDetailsImpl user = (AccountDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
