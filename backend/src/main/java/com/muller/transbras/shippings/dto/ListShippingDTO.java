package com.muller.transbras.shippings.dto;

import com.muller.transbras.shippings.model.Shipping;

import java.time.Instant;

public record ListShippingDTO(
        Instant scheduledDate,
        String from,
        String to,
        String cargoType,
        Integer weight,
        Integer distance
) {
    public ListShippingDTO(Shipping shipping) {
        this(shipping.getScheduledDate(),
                shipping.getFrom(),
                shipping.getTo(),
                shipping.getCargoType(),
                shipping.getWeight(),
                shipping.getDistance());
    }
}
