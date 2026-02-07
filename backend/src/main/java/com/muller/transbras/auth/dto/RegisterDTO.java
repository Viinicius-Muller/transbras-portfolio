package com.muller.transbras.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDTO(
        @Size(min = 6, max = 50, message = "Username must be within 6 to 50 characters")
        String username,

        @Size(min = 6, max = 70, message = "Password must be within 6 to 70 characters")
        String password
) {
}
