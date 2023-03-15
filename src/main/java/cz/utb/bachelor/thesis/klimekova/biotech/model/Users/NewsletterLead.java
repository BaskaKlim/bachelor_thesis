package cz.utb.bachelor.thesis.klimekova.biotech.model.Users;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.BiotechCategory;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Content.ContentType;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class NewsletterLead {

    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private Set<BiotechCategory> categories = new HashSet<>();
    private Set<ContentType> contentTypes = new HashSet<>();

}
