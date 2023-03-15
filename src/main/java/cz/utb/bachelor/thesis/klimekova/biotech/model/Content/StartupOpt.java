package cz.utb.bachelor.thesis.klimekova.biotech.model.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.BiotechCategory;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.StartupSupportCategory;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class StartupOpt {
    private UUID id;
    private String title;
    private String provider;
    private String description;
    private Date startDate;
    private Date endDate;
    private String website;
    private Set<BiotechCategory> categories = new HashSet<>();
    private Set<StartupSupportCategory> supportCategories = new HashSet<>();
}
