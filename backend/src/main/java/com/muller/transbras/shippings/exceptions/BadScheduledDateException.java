package com.muller.transbras.shippings.exceptions;

public class BadScheduledDateException extends RuntimeException {
    public BadScheduledDateException(String message) {
        super(message);
    }
}
