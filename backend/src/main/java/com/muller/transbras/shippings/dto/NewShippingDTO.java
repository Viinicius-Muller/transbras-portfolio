package com.muller.transbras.shippings.dto;

import jakarta.validation.constraints.*;

import java.time.Instant;

public record NewShippingDTO(
        @NotNull(message = "Date must not be null")
        Instant scheduledDate,
        @NotBlank(message = "Origin location must not be blank")
        String from,
        @NotBlank(message = "Destiny location must not be blank")
        String to,
        @NotBlank(message = "Cargo type must not be blank")
        String cargoType,
        @Min(value = 1, message = "Weight must be withing 1Kg to 100ton")
        @Max(value = 100000, message = "Weight must be withing 1Kg to 100ton")
        Integer weight,
        @Min(value = 10, message = "Distance must be within 10km to 10000km")
        @Max(value = 10000, message = "Distance must be within 10km to 10000km")
        Integer distance
) {
}
