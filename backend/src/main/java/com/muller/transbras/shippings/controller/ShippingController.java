package com.muller.transbras.shippings.controller;

import com.muller.transbras.shippings.dto.ListShippingDTO;
import com.muller.transbras.shippings.dto.NewShippingDTO;
import com.muller.transbras.shippings.service.ShippingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shipping")
@RequiredArgsConstructor
public class ShippingController {
    @Autowired
    private final ShippingService shippingService;

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid NewShippingDTO dto) {
        ListShippingDTO newShippingData = shippingService.createShipping(dto);
        return ResponseEntity.ok().body(newShippingData);
    }
}
