package cz.utb.bachelor.thesis.klimekova.biotech.model.Users;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Table(name = "Account",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter

public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String description;
    private String url;
    private String email;
    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "account_roles",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "account_contacts",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "contact_id"))
    private  Set<Contact> contacts = new HashSet<>();

    public Account(String name, String description, String url, String email, String username, String password, Set<Role> roles, Set<Contact> contacts) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.email = email;
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.contacts = contacts;
    }
}
