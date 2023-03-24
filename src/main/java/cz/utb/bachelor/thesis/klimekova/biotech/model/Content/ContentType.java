package cz.utb.bachelor.thesis.klimekova.biotech.model.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.utils.enums.EContentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ContentTypes")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ContentType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EContentType name;
}
