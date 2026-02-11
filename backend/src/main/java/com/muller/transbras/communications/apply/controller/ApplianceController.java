package com.muller.transbras.communications.apply.controller;

import com.muller.transbras.communications.apply.dto.ListApplianceDTO;
import com.muller.transbras.communications.apply.dto.NewApplianceDTO;
import com.muller.transbras.communications.apply.service.ApplianceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/communication/apply")
public class ApplianceController {
    @Autowired
    private ApplianceService applianceService;

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid NewApplianceDTO dto) {
        ListApplianceDTO newAppliance = applianceService.registerAppliance(dto);
        return ResponseEntity.ok().body(newAppliance);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        applianceService.deleteAppliance(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity get() {
        return ResponseEntity.ok().body(applianceService.getAppliances());
    }
}
