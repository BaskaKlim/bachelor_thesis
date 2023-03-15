package cz.utb.bachelor.thesis.klimekova.biotech.model.Users;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class Account {
    private UUID id;
    private String name;
    private String description;
    private String url;
    private String email;
    private String username;
    private String password;
    private Set<Role> roles = new HashSet<>();
    private  Set<Contact> contacts = new HashSet<>();

}
