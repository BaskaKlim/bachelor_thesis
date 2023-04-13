package cz.utb.fai.howtodobiotech.payload.request;

import cz.utb.fai.howtodobiotech.models.users.Contact;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

public class SignupRequest {

    @NotBlank
    @Size(min = 3, max = 14)
    private String name;

    @NotBlank
    @Size(max = 400)
    private String description;
    private String url;

    @NotBlank
    @Email(message = "Email is need to be in correct format")
    private String email;

    @NotBlank
    @Size(min = 3, max = 14)
    private String username;

    @NotBlank
    @Size(min = 10, max = 30, message = "Password should be between 10 to 30 characters or numbers")
    private String password;


    private Set<String> role;

    private  Set<Contact> contacts = new HashSet<>();

    public SignupRequest(String name, String description, String url, String email, String username, String password, Set<String> role, Set<Contact> contacts) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.contacts = contacts;
    }

    public SignupRequest() {
    }

    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set<String> getRole() {
      return this.role;
    }
    
    public void setRole(Set<String> role) {
      this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }
}
