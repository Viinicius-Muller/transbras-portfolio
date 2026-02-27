package com.muller.transbras.communications.offers.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record NewOfferDTO(
        @NotNull
        Long shippingId,
        @NotBlank
        String fullname,
        @Email
        String email,
        @Pattern(regexp = "[0-9.+-]+", message = "Phone number can only contain digits, dots, and dashes")
        @Size(min = 10, max = 20, message = "Phone number must be between 10 and 20 characters")
        String phoneNumber,
        @Min(value = 100, message = "Initial value must be at least 100")
        @Max(value = 999999, message = "Initial value must be less than 1 million")
        BigDecimal initialValue,
        @Size(min = 0, max= 250)
        String message
) {
}
