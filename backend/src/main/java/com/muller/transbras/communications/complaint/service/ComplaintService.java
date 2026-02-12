package com.muller.transbras.communications.complaint.service;

import com.muller.transbras.communications.complaint.dto.ListComplaintDTO;
import com.muller.transbras.communications.complaint.dto.NewComplaintDTO;
import com.muller.transbras.communications.complaint.model.Complaint;
import com.muller.transbras.communications.complaint.repository.ComplaintRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {
    @Autowired
    private ComplaintRepository complaintRepository;

    @Transactional
    public ListComplaintDTO registerComplaint(NewComplaintDTO complaintDTO) {
        Complaint complaint = new Complaint();
        complaint.setFullname(complaintDTO.fullname());
        complaint.setEmail(complaintDTO.email());
        complaint.setPhoneNumber(complaintDTO.phoneNumber());
        complaint.setMessage(complaintDTO.message());
        complaint.setVictim(complaintDTO.victim());
        complaint.setResolved(false);

        complaintRepository.save(complaint);
        return new ListComplaintDTO(complaint);
    }

    @Transactional
    public void resolveComplaint(Long id) {
        Complaint complaint = complaintRepository.findById(id).orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setResolved(true);
        complaintRepository.save(complaint);
    }

    public List<ListComplaintDTO> getAllComplaints() {
        List<Complaint> complaints = complaintRepository.findAll();
        return complaints.stream().map(ListComplaintDTO::new).toList();
    }
}
