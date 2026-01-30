package com.muller.transbras.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateDTO(
        @Size(min = 6, max = 50)
        String username,

        @Size(min = 6, max = 70)
        String password
) {
}