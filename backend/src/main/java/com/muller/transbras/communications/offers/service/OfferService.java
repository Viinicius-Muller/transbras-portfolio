package com.muller.transbras.communications.offers.service;

import com.muller.transbras.communications.exceptions.MessageNotFoundException;
import com.muller.transbras.communications.offers.dto.ListOfferDTO;
import com.muller.transbras.communications.offers.dto.NewOfferDTO;
import com.muller.transbras.communications.offers.dto.UpdateStatusDTO;
import com.muller.transbras.communications.offers.exception.OfferNotFoundException;
import com.muller.transbras.communications.offers.model.Offer;
import com.muller.transbras.communications.offers.model.Status;
import com.muller.transbras.communications.offers.repository.OfferRepository;
import com.muller.transbras.shippings.exceptions.ShippingNotFoundException;
import com.muller.transbras.shippings.model.Shipping;
import com.muller.transbras.shippings.repository.ShippingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferService {
    @Autowired
    private OfferRepository offerRepository;
    @Autowired
    private ShippingRepository shippingRepository;

    @Transactional
    public ListOfferDTO createOffer(NewOfferDTO dto) {
        Shipping shipping = shippingRepository.findById(dto.shippingId())
                .orElseThrow(() -> new ShippingNotFoundException("Shipping not found with id: " + dto.shippingId()));
        Offer offer = new Offer();

        offer.setShipping(shipping);
        offer.setEmail(dto.email());
        offer.setFullname(dto.fullname());
        offer.setInitialValue(dto.initialValue());
        offer.setMessage(dto.message());
        offer.setPhoneNumber(dto.phoneNumber());
        offer.setStatus(Status.PENDING);

        offerRepository.save(offer);
        return new ListOfferDTO(offer);
    }

    @Transactional
    public void deleteOffer(Long id) {
        if (!offerRepository.existsById(id))
            throw new OfferNotFoundException("Offer not found with id: " + id);
        offerRepository.deleteById(id);
    }

    public List<ListOfferDTO> getOffers() {
        return offerRepository.findAll().stream().map(ListOfferDTO::new).toList();
    }

    @Transactional
    public void updateOfferStatus(Long id, UpdateStatusDTO dto) {
        Offer offer = offerRepository.findById(id)
                .orElseThrow(() -> new OfferNotFoundException("Offer not found with id: " + id));
        offer.setStatus(dto.status());
        offerRepository.save(offer);
    }
}
