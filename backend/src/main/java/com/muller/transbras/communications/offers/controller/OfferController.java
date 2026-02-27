package com.muller.transbras.communications.offers.controller;

import com.muller.transbras.communications.offers.dto.ListOfferDTO;
import com.muller.transbras.communications.offers.dto.NewOfferDTO;
import com.muller.transbras.communications.offers.dto.UpdateStatusDTO;
import com.muller.transbras.communications.offers.model.Status;
import com.muller.transbras.communications.offers.service.OfferService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/communication/offer")
@RequiredArgsConstructor
public class OfferController {
    @Autowired
    private final OfferService offerService;

    @PostMapping
    public ResponseEntity<ListOfferDTO> create(@RequestBody @Valid NewOfferDTO dto) {
        ListOfferDTO newOffer = offerService.createOffer(dto);
        return ResponseEntity.ok().body(newOffer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        offerService.deleteOffer(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<ListOfferDTO>> list() {
        return ResponseEntity.ok().body(offerService.getOffers());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @RequestBody @Valid UpdateStatusDTO dto) {
        offerService.updateOfferStatus(id, dto);
        return ResponseEntity.ok().build();
    }
}
