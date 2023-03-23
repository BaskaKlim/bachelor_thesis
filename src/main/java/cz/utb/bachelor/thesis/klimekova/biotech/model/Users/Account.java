package cz.utb.bachelor.thesis.klimekova.biotech.model.Users;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
                @UniqueConstraint(columnNames = "password")
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

    @NotBlank(message = "Name of account is mandatory")
    @Size(min = 3, max = 14)
    private String name;

    @NotBlank(message = "Description of organization is mandatory")
    @Size(max = 400)
    private String description;
    private String url;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email is need to be in correct format")
    private String email;

    @NotBlank(message = "Username is mandatory")
    @Size(min = 3, max = 14)
    private String username;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 10, max = 30, message = "Password should be between 10 to 30 characters or numbers")
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
