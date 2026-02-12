package com.muller.transbras.communications.complaint.dto;

import com.muller.transbras.communications.complaint.model.Complaint;

public record ListComplaintDTO(
    Long id,
    String fullname,
    String email,
    String phoneNumber,
    String message,
    boolean victim,
    boolean resolved
) {
    public ListComplaintDTO(Complaint complaint) {
        this(
            complaint.getId(),
            complaint.getFullname(),
            complaint.getEmail(),
            complaint.getPhoneNumber(),
            complaint.getMessage(),
            complaint.isVictim(),
            complaint.isResolved()
        );
    }
}
