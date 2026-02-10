package com.muller.transbras.communications.partnership.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "partnerships")
@Data
public class Partnership {
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

    @NotNull
    private PartnershipType partnershipType;

    private String companyName;

    @NotBlank
    private String message;
}
