package com.muller.transbras.communications.complaint.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "complaints")
@Data
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String fullname;

    @NotBlank
    @Email
    private String email;

    @Pattern(regexp = "[0-9.+-]+", message = "Phone number can only contain digits, dots, and dashes")
    @Size(min = 10, max = 20, message = "Phone number must be between 10 and 20 characters")
    private String phoneNumber;

    @NotBlank
    private String message;

    @NotNull
    private boolean victim;
    @NotNull
    private boolean resolved;
}
