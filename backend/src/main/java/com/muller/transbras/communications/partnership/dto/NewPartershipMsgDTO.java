package com.muller.transbras.communications.partnership.dto;

import com.muller.transbras.communications.partnership.model.PartnershipType;
import jakarta.validation.constraints.*;

public record NewPartershipMsgDTO(
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @Email
        String email,
        @Pattern(regexp = "[0-9.+-]+", message = "Phone number can only contain digits, dots, and dashes")
        @Size(min = 10, max = 20, message = "Phone number must be between 10 and 20 characters")
        String phoneNumber,
        @NotNull
        PartnershipType partnershipType,
        String companyName,
        @NotBlank
        String message
) {
}
