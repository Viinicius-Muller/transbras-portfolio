package com.muller.transbras.shippings.exceptions;

public class ShippingNotFoundException extends RuntimeException {
    public ShippingNotFoundException(String message) {
        super(message);
    }
}
