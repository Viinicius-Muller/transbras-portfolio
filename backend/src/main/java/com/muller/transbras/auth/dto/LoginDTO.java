package com.muller.transbras.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginDTO(
        @Size(min = 6, max = 50, message = "Username must be within 6 to 50 characters")
        String username,

        @NotBlank(message = "Password must not be empty")
        String password
) {
}
