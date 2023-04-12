package cz.utb.fai.howtodobiotech.payload.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cz.utb.fai.howtodobiotech.models.users.Contact;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class AccountInfoResponse {

    private Integer id;
    private String name;
    private String description;
    private String url;
    private String email;
    private String username;

    private List<String> roles;
    private Set<Contact> contacts ;

    public AccountInfoResponse(Integer id, String name, String description, String url, String email, String username, List<String> roles, Set<Contact> contacts) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.email = email;
        this.username = username;
        this.roles = roles;
        this.contacts = contacts;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }
}
