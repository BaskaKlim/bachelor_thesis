package cz.utb.fai.howtodobiotech.models.content;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.SkillCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotBlank
    private String title;

    private String organizer;
    @NotBlank
    @Size(max = 1000)
    private String description;

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "START_DATE")
    private Date startDate;

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "END_DATE")
    private Date endDate;
    @Size(max = 400)
    private String website;

    @NotNull
    private Integer accountId;

    @NotNull
    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "SkillOpt_Countries",
            joinColumns = @JoinColumn(name = "SkillOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "Country_Id"))
    private Set<Country> countries = new HashSet<>();
    @NotNull
    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "SkillOpt_BiotechCategories",
            joinColumns = @JoinColumn(name = "SkillOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "BiotechCategory_id"))
    private Set<BiotechCategory> biotechCategories = new HashSet<>();

    @NotNull
    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "SkillOpt_SkillCategories",
            joinColumns = @JoinColumn(name = "SkillOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "SkillCategory_id"))
    private Set<SkillCategory> skillCategories = new HashSet<>();

    public SkillOpt(String title, String organizer, String description, Date startDate, Date endDate, String website, Set<Country> countries, Integer accountId, Set<BiotechCategory> biotechCategories, Set<SkillCategory> skillCategories) {
        this.title = title;
        this.organizer = organizer;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.website = website;
        this.countries = countries;
        this.accountId = accountId;
        this.biotechCategories = biotechCategories;
        this.skillCategories = skillCategories;
    }
}
