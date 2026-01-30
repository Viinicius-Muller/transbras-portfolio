package com.muller.transbras.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginDTO(
        @Size(min = 6, max = 50)
        @NotBlank
        String username,

        @NotBlank
        String password
) {
}
