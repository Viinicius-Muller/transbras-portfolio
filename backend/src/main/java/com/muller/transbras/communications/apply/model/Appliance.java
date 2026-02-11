package com.muller.transbras.communications.apply.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "appliances")
@Data
public class Appliance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String fullname;

    @NotBlank
    @Email
    private String email;

    @Pattern(regexp = "[0-9.+-]+", message = "Phone number can only contain digits, dots, and dashes")
    @Size(min = 10, max = 20, message = "Phone number must be between 10 and 20 characters")
    private String phoneNumber;

    @NotBlank
    private String message;
}
