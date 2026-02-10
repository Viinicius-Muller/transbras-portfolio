package com.muller.transbras.shippings.controller;

import com.muller.transbras.shippings.dto.ListShippingDTO;
import com.muller.transbras.shippings.dto.NewShippingDTO;
import com.muller.transbras.shippings.service.ShippingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    ResponseEntity get() {
        List<ListShippingDTO> shippings = shippingService.getShippings();
        return ResponseEntity.ok().body(shippings);
    }

    @DeleteMapping("/{id}")
    ResponseEntity delete(@PathVariable Long id) {
        shippingService.deleteShipping(id);
        return ResponseEntity.ok().body("Shipping deleted: "+id);
    }
}
