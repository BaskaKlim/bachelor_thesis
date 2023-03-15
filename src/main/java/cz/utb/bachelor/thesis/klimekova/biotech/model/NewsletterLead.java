package cz.utb.bachelor.thesis.klimekova.biotech.model;

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
