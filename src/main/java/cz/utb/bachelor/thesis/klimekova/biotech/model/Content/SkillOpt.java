package cz.utb.bachelor.thesis.klimekova.biotech.model.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.BiotechCategory;
import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.SkillCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "SkillOpportunities")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SkillOpt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Title of skill opportunity is mandatory")
    private String title;

    @NotBlank(message = "Organizer providing skill opportunity  is mandatory")
    private String organizer;

    @NotBlank(message = "Description of skill opportunity or service is mandatory")
    private String description;

    @NotBlank(message = "Start date of skill opportunity or service is mandatory")
    private Date startDate;

    @NotBlank(message = "End date of skill opportunity or service is mandatory")
    private Date endDate;

    @NotBlank(message = "Website of skill opportunity or service is mandatory")
    private String website;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "skillOpt_biotechCategories",
            joinColumns = @JoinColumn(name = "skillOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "biotechCategory_id"))
    private Set<BiotechCategory> categories = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "skillOpt_skillCategories",
            joinColumns = @JoinColumn(name = "skillOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "skillCategory_id"))
    private Set<SkillCategory> skillCategories = new HashSet<>();

    public SkillOpt(String title, String organizer, String description,  Date startDate,  Date endDate, String website, Set<BiotechCategory> categories, Set<SkillCategory> skillCategories) {
        this.title = title;
        this.organizer = organizer;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.website = website;
        this.categories = categories;
        this.skillCategories = skillCategories;
    }
}
