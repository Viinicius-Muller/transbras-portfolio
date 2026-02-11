package com.muller.transbras.communications.apply.repository;

import com.muller.transbras.communications.apply.model.Appliance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplianceRepository extends JpaRepository<Appliance, Long> {
}
