package cz.utb.bachelor.thesis.klimekova.biotech.model.Users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "contacts")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Contact {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private UUID id;
   private String firstName;
   private String lastName;
   private String phone;
   private String email;
   private String jobPosition;
   private UUID accountUuid;

   public Contact(String firstName, String lastName, String phone, String email, String jobPosition, UUID accountUuid) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone = phone;
      this.email = email;
      this.jobPosition = jobPosition;
      this.accountUuid = accountUuid;
   }
}
