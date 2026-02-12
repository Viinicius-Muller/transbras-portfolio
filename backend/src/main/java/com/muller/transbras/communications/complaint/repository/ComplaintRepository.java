package com.muller.transbras.communications.complaint.repository;

import com.muller.transbras.communications.complaint.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}
