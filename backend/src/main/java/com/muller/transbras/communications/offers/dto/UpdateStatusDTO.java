package com.muller.transbras.communications.offers.dto;

import com.muller.transbras.communications.offers.model.Status;
import jakarta.validation.constraints.NotNull;

public record UpdateStatusDTO(
        @NotNull
        Status status
) {
}
