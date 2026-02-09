package com.muller.transbras.shippings.repository;

import com.muller.transbras.shippings.model.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingRepository extends JpaRepository<Shipping, Long> {
}
