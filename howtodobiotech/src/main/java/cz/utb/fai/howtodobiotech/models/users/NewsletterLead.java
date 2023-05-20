package cz.utb.fai.howtodobiotech.models.users;

import cz.utb.fai.howtodobiotech.models.categories.BiotechCategory;
import cz.utb.fai.howtodobiotech.models.categories.ContentType;
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


@Table(name = "NewsletterLeads")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NewsletterLead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "First is mandatory")
    @Size(min = 2, max = 15)
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    @Size(min = 2, max = 15)
    private String lastName;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email is need to be in correct format")
    private String email;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "Lead_Categories",
            joinColumns = @JoinColumn(name = "newsletterLead_id"),
            inverseJoinColumns = @JoinColumn(name = "biotechCategory_id"))
    private Set<BiotechCategory> categories = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "lead_contenttypes",
            joinColumns = @JoinColumn(name = "newsletterLead_id"),
            inverseJoinColumns = @JoinColumn(name = "contentType_id"))
    private Set<ContentType> contentTypes = new HashSet<>();

    public NewsletterLead(String firstName, String lastName, String email, Set<BiotechCategory> categories, Set<ContentType> contentTypes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.categories = categories;
        this.contentTypes = contentTypes;
    }
}
