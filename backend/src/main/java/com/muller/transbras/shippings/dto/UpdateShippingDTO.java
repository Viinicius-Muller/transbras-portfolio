package com.muller.transbras.shippings.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.time.Instant;
import java.time.LocalDate;

public record UpdateShippingDTO(
        LocalDate scheduledDate,
        String from,
        String to,
        String cargoType,
        @Nullable
        @Min(value = 1, message = "Weight must be withing 1Kg to 100ton")
        @Max(value = 100000, message = "Weight must be withing 1Kg to 100ton")
        Integer weight,
        @Nullable
        @Min(value = 10, message = "Distance must be within 10km to 10000km")
        @Max(value = 10000, message = "Distance must be within 10km to 10000km")
        Integer distance
) {
}
