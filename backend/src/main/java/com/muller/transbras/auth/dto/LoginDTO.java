package com.muller.transbras.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginDTO(
        @Size(min = 5, max = 50, message = "Username must be within 5 to 50 characters")
        String username,

        @NotBlank(message = "Password must not be empty")
        String password
) {
}
