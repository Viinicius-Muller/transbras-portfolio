package com.muller.transbras.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDTO(
        @Size(min = 5, max = 50, message = "Username must be within 5 to 50 characters")
        String username,

        @Size(min = 5, max = 70, message = "Password must be within 5 to 70 characters")
        String password
) {
}
