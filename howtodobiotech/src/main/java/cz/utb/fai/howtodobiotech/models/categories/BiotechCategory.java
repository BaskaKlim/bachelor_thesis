package cz.utb.fai.howtodobiotech.models.categories;

import cz.utb.fai.howtodobiotech.utils.enums.EBiotechCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "BiotechCategories")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BiotechCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length =50)
    private EBiotechCategory name;
}
