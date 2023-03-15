package cz.utb.bachelor.thesis.klimekova.biotech.model.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.ExpertCategory;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class BiotechExpert {


    private UUID id;
    private String firstName;
    private String lastName;
    private String jobPosition;
    private String email;
    private String linkedinUrl;
    private String backgroundDescription;
    private Set<ExpertCategory> expertise = new HashSet<>();
}
