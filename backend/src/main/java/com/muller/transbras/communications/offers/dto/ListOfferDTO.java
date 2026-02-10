package com.muller.transbras.communications.offers.dto;

import com.muller.transbras.communications.offers.model.Offer;
import com.muller.transbras.communications.offers.model.Status;

public record ListOfferDTO(
        Long id,
        Long shippingId,
        String fullname,
        String email,
        String phoneNumber,
        String initialValue,
        String message,
        Status status
) {
    public ListOfferDTO(Offer offer) {
        this(
                offer.getId(),
                offer.getShipping().getId(),
                offer.getFullname(),
                offer.getEmail(),
                offer.getPhoneNumber(),
                offer.getInitialValue().toString(),
                offer.getMessage(),
                offer.getStatus()
        );
    }
}
