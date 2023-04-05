package cz.utb.fai.howtodobiotech.models.content;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String description;

    @NotBlank(message = "Website is mandatory")
    private String website;


    //TODO: fix the manyTomany relation
    /*
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "innovation_biotechCategories",
            joinColumns = @JoinColumn(name = "_id"),
            inverseJoinColumns = @JoinColumn(name = "biotechCategory_id"))
    private Set<BiotechCategory> categories = new HashSet<>();
*/
    public Innovation(String title, String description, String website) {
        this.title = title;
        this.description = description;
        this.website = website;
     //   this.categories = categories;
    }
}
