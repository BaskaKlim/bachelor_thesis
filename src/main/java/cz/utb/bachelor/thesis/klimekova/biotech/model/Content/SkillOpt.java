package cz.utb.bachelor.thesis.klimekova.biotech.model.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.BiotechCategory;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.SkillCategory;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class SkillOpt {

    private UUID id;
    private String title;
    private String organizer;
    private String description;
    private Date startDate;
    private Date endDate;
    private String website;
    private Set<BiotechCategory> categories = new HashSet<>();
    private Set<SkillCategory> skillCategories = new HashSet<>();

}
