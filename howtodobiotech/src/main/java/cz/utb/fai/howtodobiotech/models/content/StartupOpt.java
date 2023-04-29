package cz.utb.fai.howtodobiotech.models.content;


import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.StartupSupportCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.joda.time.LocalDate;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "StartupOpportunities")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StartupOpt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "Title of startup opportunity is mandatory")
    private String title;

    @NotBlank(message = "Provider of startup opportunity  is mandatory")
    private String provider;

    @NotBlank(message = "Description of startup opportunity or service is mandatory")
    @Size(max = 1000)
    private String description;
    @Temporal(TemporalType.DATE)
    @Column(name = "START_DATE")
    @NotNull(message = "Start date of startup opportunity or service is mandatory")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "END_DATE")
    @NotNull(message = "End date of startup opportunity or service is mandatory")
    private Date endDate;

    @NotBlank(message = "Website of startup opportunity or service is mandatory")
    private String website;
    @NotNull
    private Integer accountId;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "StartupOpt_Countries",
            joinColumns = @JoinColumn(name = "StartupOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "Country_Id"))
    private Set<Country> countries;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "StartupOpt_BiotechCategories",
            joinColumns = @JoinColumn(name = "StartupOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "BiotechCategory_id"))
    private Set<BiotechCategory> categories = new HashSet<>();

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "StartupOpt_SupportCategories",
            joinColumns = @JoinColumn(name = "StartupOpt_id"),
            inverseJoinColumns = @JoinColumn(name = "Category_id"))
    private Set<StartupSupportCategory> supportCategories = new HashSet<>();

    public StartupOpt(String title, String provider, String description, Date startDate, Date endDate, String website, Integer accountId, Set<Country> countries, Set<BiotechCategory> categories, Set<StartupSupportCategory> supportCategories) {
        this.title = title;
        this.provider = provider;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.website = website;
        this.accountId = accountId;
        this.countries = countries;
        this.categories = categories;
        this.supportCategories = supportCategories;
    }
}
