package cz.utb.fai.howtodobiotech.models.content;

import cz.utb.fai.howtodobiotech.models.categories.ExpertCategory;
import cz.utb.fai.howtodobiotech.utils.enums.ECountry;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "BiotechExperts")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BiotechExpert {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "First is mandatory")
    @Size(min = 2, max = 15)
    private String firstName;
    @NotBlank(message = "Last name is mandatory")
    @Size(min = 2, max = 15)
    private String lastName;

    @NotBlank(message = "Job position is mandatory")
    private String jobPosition;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email is need to be in correct format")
    private String email;

    private String linkedinUrl;

    @NotBlank(message = "Description of organization is mandatory")
    @Size(max = 1000)
    private String backgroundDescription;

    private ECountry country;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "BiotechExpert_ExpertCategories",
            joinColumns = @JoinColumn(name = "BiotechExpert_id"),
            inverseJoinColumns = @JoinColumn(name = "ExpertCategory_id"))
    private Set<ExpertCategory> expertise = new HashSet<>();

    public BiotechExpert(String firstName, String lastName, String jobPosition, String email, String linkedinUrl, String backgroundDescription, ECountry country, Set<ExpertCategory> expertise) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobPosition = jobPosition;
        this.email = email;
        this.linkedinUrl = linkedinUrl;
        this.backgroundDescription = backgroundDescription;
        this.country = country;
        this.expertise = expertise;
    }
}
