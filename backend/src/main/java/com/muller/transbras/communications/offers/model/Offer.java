package com.muller.transbras.communications.offers.model;

import com.muller.transbras.shippings.model.Shipping;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "offers")
@Data
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_id", nullable = false)
    private Shipping shipping;

    @NotBlank
    private String fullname;

    @Email
    private String email;

    @Pattern(regexp = "[0-9.+-]+", message = "Phone number can only contain digits, dots, and dashes")
    @Size(min = 10, max = 20, message = "Phone number must be between 10 and 20 characters")
    private String phoneNumber;

    @Min(value = 100, message = "Initial value must be at least 100")
    @Max(value = 999999, message = "Initial value must be less than 1 million")
    private BigDecimal initialValue;

    private String message; //optional description of the offer

    @NotNull(message = "Must provide a status for the offer")
    private Status status;
}
