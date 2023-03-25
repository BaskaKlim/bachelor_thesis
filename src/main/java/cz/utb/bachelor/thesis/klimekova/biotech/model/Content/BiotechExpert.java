package cz.utb.bachelor.thesis.klimekova.biotech.model.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.ExpertCategory;
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
import java.util.UUID;

@Entity
@Table(name = "BiotechExperts")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BiotechExpert {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;
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
    @Size(max = 400)
    private String backgroundDescription;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "expert_categories",
            joinColumns = @JoinColumn(name = "expert_id"),
            inverseJoinColumns = @JoinColumn(name = "expertCategory_id"))
    private Set<ExpertCategory> expertise = new HashSet<>();

    public BiotechExpert(String firstName, String lastName, String jobPosition, String email, String linkedinUrl, String backgroundDescription, Set<ExpertCategory> expertise) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobPosition = jobPosition;
        this.email = email;
        this.linkedinUrl = linkedinUrl;
        this.backgroundDescription = backgroundDescription;
        this.expertise = expertise;
    }
}
