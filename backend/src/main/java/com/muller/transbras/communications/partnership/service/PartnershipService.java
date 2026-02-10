package com.muller.transbras.communications.partnership.service;

import com.muller.transbras.communications.exceptions.MessageNotFoundException;
import com.muller.transbras.communications.partnership.dto.ListPartnershipMsgDTO;
import com.muller.transbras.communications.partnership.dto.NewPartershipMsgDTO;
import com.muller.transbras.communications.partnership.model.Partnership;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartnershipService {
    @Autowired
    private PartnershipRepository partnershipRepository;

    @Transactional
    public ListPartnershipMsgDTO createMessage(NewPartershipMsgDTO dto) {
        Partnership partnership = new Partnership();

        String fullname = dto.firstName().trim() + " " + dto.lastName().trim();

        partnership.setFullname(fullname);
        partnership.setEmail(dto.email());
        partnership.setPhoneNumber(dto.phoneNumber());
        partnership.setPartnershipType(dto.partnershipType());
        partnership.setCompanyName(dto.companyName());
        partnership.setMessage(dto.message());

        partnershipRepository.save(partnership);
        return new ListPartnershipMsgDTO(partnership);
    }

    @Transactional
    public void deleteMessage(Long id) {
        if (!partnershipRepository.existsById(id))
            throw new MessageNotFoundException("Message not found with id: " + id);
        partnershipRepository.deleteById(id);
    }

    public List<ListPartnershipMsgDTO> getMessages() {
        return partnershipRepository.findAll().stream().map(ListPartnershipMsgDTO::new).toList();
    }
}
