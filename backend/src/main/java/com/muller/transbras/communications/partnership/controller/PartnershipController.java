package com.muller.transbras.communications.partnership.controller;

import com.muller.transbras.communications.partnership.dto.ListPartnershipMsgDTO;
import com.muller.transbras.communications.partnership.dto.NewPartershipMsgDTO;
import com.muller.transbras.communications.partnership.service.PartnershipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/communication/partnership")
@RequiredArgsConstructor
public class PartnershipController {
    @Autowired
    private PartnershipService partnershipService;

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid NewPartershipMsgDTO dto) {
        ListPartnershipMsgDTO newMessage = partnershipService.createMessage(dto);
        return ResponseEntity.ok().body(newMessage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        partnershipService.deleteMessage(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity getAll() {
        List<ListPartnershipMsgDTO> messages = partnershipService.getMessages();
        return ResponseEntity.ok().body(messages);
    }
}
