package com.muller.transbras.communications.complaint.controller;

import com.muller.transbras.communications.complaint.dto.ListComplaintDTO;
import com.muller.transbras.communications.complaint.dto.NewComplaintDTO;
import com.muller.transbras.communications.complaint.service.ComplaintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/communication/complaint")
@RequiredArgsConstructor
public class ComplaintController {
    @Autowired
    private final ComplaintService complaintService;

    @PostMapping
    public ResponseEntity<ListComplaintDTO> createComplaint(@RequestBody @Valid NewComplaintDTO dto) {
        return ResponseEntity.ok().body(complaintService.registerComplaint(dto));
    }

    @PatchMapping("/{id}/resolve")
    public ResponseEntity<Void> resolveComplaint(@PathVariable Long id) {
        complaintService.resolveComplaint(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<ListComplaintDTO>> getAllComplaints() {
        return ResponseEntity.ok().body(complaintService.getAllComplaints());
    }
}
