package com.muller.transbras.communications.partnership.service;

import com.muller.transbras.communications.partnership.model.Partnership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartnershipRepository extends JpaRepository<Partnership, Long> {
}
