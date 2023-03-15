package cz.utb.bachelor.thesis.klimekova.biotech.model.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.BiotechCategory;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class Innovation {
    private UUID id;
    private String title;
    private String description;
    private String website;
    private Set<BiotechCategory> categories = new HashSet<>();


}
