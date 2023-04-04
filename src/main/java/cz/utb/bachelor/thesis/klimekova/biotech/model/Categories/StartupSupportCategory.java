package cz.utb.bachelor.thesis.klimekova.biotech.model.Categories;

import cz.utb.bachelor.thesis.klimekova.biotech.utils.enums.ESupportCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "SupportCategories")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StartupSupportCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ESupportCategory name;
}
