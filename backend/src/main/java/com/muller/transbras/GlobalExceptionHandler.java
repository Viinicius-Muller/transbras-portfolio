package com.muller.transbras;

import com.muller.transbras.auth.exception.IncorrectCredentialsException;
import com.muller.transbras.auth.exception.UserNotFoundException;
import com.muller.transbras.auth.exception.UsernameAlreadyTakenException;
import com.muller.transbras.communications.exceptions.MessageNotFoundException;
import com.muller.transbras.shippings.exceptions.BadScheduledDateException;
import com.muller.transbras.shippings.exceptions.ShippingNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    private ResponseEntity<Map<String, Object>> handleRuntime(RuntimeException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", HttpStatus.BAD_REQUEST);
        body.put("message", ex.getMessage());

        return ResponseEntity.status(400).body(body);
    }

    @ExceptionHandler(IncorrectCredentialsException.class)
    private ResponseEntity<Map<String, Object>> handleInvalidCredentials(IncorrectCredentialsException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", HttpStatus.BAD_REQUEST);
        body.put("message", ex.getMessage());

        return ResponseEntity.status(400).body(body);
    }

    @ExceptionHandler(UserNotFoundException.class)
    private ResponseEntity<Map<String, Object>> handleUserNotFound(UserNotFoundException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", HttpStatus.NOT_FOUND);
        body.put("message", ex.getMessage());

        return ResponseEntity.status(404).body(body);
    }

    @ExceptionHandler(UsernameAlreadyTakenException.class)
    private ResponseEntity<Map<String, Object>> handleUsernameAlreadyTaken(UsernameAlreadyTakenException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", HttpStatus.CONFLICT);
        body.put("message", ex.getMessage());

        return ResponseEntity.status(409).body(body);
    }

    @ExceptionHandler(BadScheduledDateException.class)
    private ResponseEntity<Map<String, Object>> handleBadScheduledDate(BadScheduledDateException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", HttpStatus.BAD_REQUEST);
        body.put("message", ex.getMessage());

        return ResponseEntity.status(400).body(body);
    }

    @ExceptionHandler(ShippingNotFoundException.class)
    private ResponseEntity<Map<String, Object>> handleShippingNotFound(ShippingNotFoundException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", HttpStatus.NOT_FOUND);
        body.put("message", ex.getMessage());

        return ResponseEntity.status(404).body(body);
    }

    @ExceptionHandler(MessageNotFoundException.class)
    private ResponseEntity<Map<String, Object>> handleMessageNotFound(MessageNotFoundException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", HttpStatus.NOT_FOUND);
        body.put("message", ex.getMessage());

        return ResponseEntity.status(404).body(body);
    }
}
