package cz.utb.bachelor.thesis.klimekova.biotech.model.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Categories.BiotechCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "Innovations")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Innovation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotBlank(message = "Name of product or service is mandatory")
    private String title;

    @NotBlank(message = "Description is mandatory")
    private String description;

    @NotBlank(message = "Website is mandatory")
    private String website;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "innovation_categories",
            joinColumns = @JoinColumn(name = "innovation_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<BiotechCategory> categories = new HashSet<>();


}
