package cz.utb.fai.howtodobiotech.models.users;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Table(name = "Contacts")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "First is mandatory")
    @Size(min = 2, max = 15)
    private String firstName;
    @NotBlank(message = "Last name is mandatory")
    @Size(min = 2, max = 15)
    private String lastName;
    @NotBlank(message = "Phone is mandatory")
    private String phone;
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email is need to be in correct format")
    private String email;

    @NotBlank(message = "Job position is mandatory")
    private String jobPosition;

    public Contact(String firstName, String lastName, String phone, String email, String jobPosition) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.jobPosition = jobPosition;
    }
}
