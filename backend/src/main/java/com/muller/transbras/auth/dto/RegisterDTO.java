package com.muller.transbras.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDTO(
        @Size(min = 6, max = 50)
        @NotBlank
        String username,

        @Size(min = 6, max = 70)
        @NotBlank
        String password
) {
}
