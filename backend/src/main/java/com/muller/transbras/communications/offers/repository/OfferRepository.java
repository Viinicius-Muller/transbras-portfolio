package com.muller.transbras.communications.offers.repository;

import com.muller.transbras.communications.offers.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferRepository extends JpaRepository<Offer, Long> {
}
