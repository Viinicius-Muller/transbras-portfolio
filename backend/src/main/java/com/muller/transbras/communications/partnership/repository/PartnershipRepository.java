package com.muller.transbras.communications.partnership.repository;

import com.muller.transbras.communications.partnership.model.Partnership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartnershipRepository extends JpaRepository<Partnership, Long> {
}
