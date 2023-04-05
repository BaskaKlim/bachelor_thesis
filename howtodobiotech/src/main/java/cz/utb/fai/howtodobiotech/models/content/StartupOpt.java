package cz.utb.fai.howtodobiotech.models.content;


import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "StartupOpportunities")
@Setter
@Getter
@NoArgsConstructor
public class StartupOpt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "Title of startup opportunity is mandatory")
    private String title;

    @NotBlank(message = "Provider of startup opportunity  is mandatory")
    private String provider;

    @NotBlank(message = "Description of startup opportunity or service is mandatory")
    private String description;

    @NotBlank(message = "Start date of startup opportunity or service is mandatory")
    private Date startDate;

    @NotBlank(message = "End date of startup opportunity or service is mandatory")
    private Date endDate;

    @NotBlank(message = "Website of startup opportunity or service is mandatory")
    private String website;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "startupOpt_biotechCategories",
            joinColumns = @JoinColumn(name = "startupOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "biotechCategory_id"))
    private Set<BiotechCategory> categories = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "startupOpt_supportCategories",
            joinColumns = @JoinColumn(name = "startupOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<StartupSupportCategory> supportCategories = new HashSet<>();

    public StartupOpt( String title, String provider, String description,  Date startDate, Date endDate,  String website, Set<BiotechCategory> categories, Set<StartupSupportCategory> supportCategories) {
        this.title = title;
        this.provider = provider;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.website = website;
        this.categories = categories;
        this.supportCategories = supportCategories;
    }
}
