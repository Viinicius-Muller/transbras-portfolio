package com.muller.transbras.communications.apply.dto;

import jakarta.validation.constraints.*;

public record NewApplianceDTO(
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @NotNull
        @Email
        String email,
        @Pattern(regexp = "[0-9.+-]+", message = "Phone number can only contain digits, dots, and dashes")
        @Size(min = 10, max = 20, message = "Phone number must be between 10 and 20 characters")
        String phoneNumber,
        @NotBlank
        String message
) {
}
