package cz.utb.fai.howtodobiotech.models.content;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Innovations")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Innovation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Name of product or service is mandatory")
    private String title;

    @NotBlank(message = "Description is mandatory")
    @Size(max = 1000)
    private String description;

    @NotBlank(message = "Website is mandatory")
    private String website;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "Country_Innovations",
            joinColumns = @JoinColumn(name = "Innovation_id"),
            inverseJoinColumns = @JoinColumn(name = "Country_Id"))
    private Country country;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "Innovation_BiotechCategories",
            joinColumns = @JoinColumn(name = "Innovation_id"),
            inverseJoinColumns = @JoinColumn(name = "BiotechCategory_id"))
    private Set<BiotechCategory> categories = new HashSet<>();


    public Innovation(String title, String description, String website, Country country, Set<BiotechCategory> categories) {
        this.title = title;
        this.description = description;
        this.website = website;
        this.country = country;
        this.categories = categories;
    }
}
