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

    @NotBlank(message = "Title of skill opportunity is mandatory")
    private String title;

    @NotBlank(message = "Organizer providing skill opportunity  is mandatory")
    private String organizer;

    @NotBlank(message = "Description of skill opportunity or service is mandatory")
    @Size(max = 1000)
    private String description;

    @Temporal(TemporalType.DATE)
    @Column(name = "START_DATE")
    @NotNull(message = "Start date of skill opportunity or service is mandatory")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "END_DATE")
    @NotNull(message = "End date of skill opportunity or service is mandatory")
    private Date endDate;
    @NotBlank(message = "Website of skill opportunity or service is mandatory")
    private String website;

    @NotNull
    private Integer accountId;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "SkillOpt_Countries",
            joinColumns = @JoinColumn(name = "SkillOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "Country_Id"))
    private Set<Country> countries = new HashSet<>();
    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "SkillOpt_BiotechCategories",
            joinColumns = @JoinColumn(name = "SkillOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "BiotechCategory_id"))
    private Set<BiotechCategory> biotechCategories = new HashSet<>();

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
