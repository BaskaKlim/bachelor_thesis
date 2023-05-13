package cz.utb.fai.howtodobiotech.payload.response;

import java.util.Collection;

public class AccountInfoResponse {
    private Integer id;
    private String name;
    private String description;
    private String url;
    private String email;
    private String username;
    private String password;
    private Collection<String> roles;

    public AccountInfoResponse(Integer id, String name, String description, String url, String email, String username, Collection<String> roles) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    public Integer getId() {
        return id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<String> getRoles() {
        return roles;
    }

    public void setRoles(Collection<String> roles) {
        this.roles = roles;
    }
}
