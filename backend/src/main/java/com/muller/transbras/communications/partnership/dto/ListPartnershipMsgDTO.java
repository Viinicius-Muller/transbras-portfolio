package com.muller.transbras.communications.partnership.dto;

import com.muller.transbras.communications.partnership.model.Partnership;

public record ListPartnershipMsgDTO(
        Long id,
        String fullname,
        String email,
        String phoneNumber,
        String partnershipType,
        String companyName,
        String message
) {
    public ListPartnershipMsgDTO(Partnership partnership){
        this(
                partnership.getId(),
                partnership.getFullname(),
                partnership.getEmail(),
                partnership.getPhoneNumber(),
                partnership.getPartnershipType().toString(),
                partnership.getCompanyName(),
                partnership.getMessage()
        );
    }
}
