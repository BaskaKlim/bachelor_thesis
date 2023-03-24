package cz.utb.bachelor.thesis.klimekova.biotech.model.Categories;

import cz.utb.bachelor.thesis.klimekova.biotech.utils.enums.EBiotechCategory;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EBiotechCategory name;
}
