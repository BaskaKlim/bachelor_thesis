package cz.utb.fai.howtodobiotech.models.content;

import cz.utb.fai.howtodobiotech.utils.enums.EContentType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EContentType name;
}
