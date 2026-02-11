package com.muller.transbras.communications.apply.dto;

import com.muller.transbras.communications.apply.model.Appliance;

public record ListApplianceDTO(
        Long id,
        String fullname,
        String email,
        String phoneNumber,
        String message
) {
    public ListApplianceDTO(Appliance appliance) {
        this(
                appliance.getId(),
                appliance.getFullname(),
                appliance.getEmail(),
                appliance.getPhoneNumber(),
                appliance.getMessage()
        );
    }
}
