package com.muller.transbras.shippings.service;

import com.muller.transbras.shippings.dto.ListShippingDTO;
import com.muller.transbras.shippings.dto.NewShippingDTO;
import com.muller.transbras.shippings.dto.UpdateShippingDTO;
import com.muller.transbras.shippings.exceptions.BadScheduledDateException;
import com.muller.transbras.shippings.exceptions.ShippingNotFoundException;
import com.muller.transbras.shippings.model.Shipping;
import com.muller.transbras.shippings.repository.ShippingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShippingService {
    @Autowired
    private final ShippingRepository shippingRepository;

    @Transactional
    public ListShippingDTO createShipping(NewShippingDTO dto) {
        if (Instant.now().isAfter(dto.scheduledDate()))
            throw new BadScheduledDateException("Scheduled date must be in the future");
        Shipping shipping = new Shipping();

        shipping.setCreatedAt(Instant.now());
        shipping.setScheduledDate(dto.scheduledDate());
        shipping.setFrom(dto.from());
        shipping.setTo(dto.to());
        shipping.setCargoType(dto.cargoType());
        shipping.setWeight(dto.weight());
        shipping.setDistance(dto.distance());

        shippingRepository.save(shipping);
        return new ListShippingDTO(shipping);
    }

    public List<ListShippingDTO> getShippings() {
        return shippingRepository.findAll().stream().map(ListShippingDTO::new).toList();
    }

    @Transactional
    public void deleteShipping(Long id) {
        if (!shippingRepository.existsById(id))
            throw new ShippingNotFoundException("No Shipping with this Id");
        shippingRepository.deleteById(id);
    }

    @Transactional
    public ListShippingDTO updateShipping(Long id, UpdateShippingDTO dto){
        if (Instant.now().plus(1, ChronoUnit.DAYS).isAfter(dto.scheduledDate()))
            throw new BadScheduledDateException("Scheduled date must be at least 24 hours in the future");

        Shipping shipping = shippingRepository.findById(id)
                .orElseThrow(() -> new ShippingNotFoundException("No Shipping with this Id"));
        shipping.update(dto);
        shippingRepository.save(shipping);

        return new ListShippingDTO(shipping);
    }
}
