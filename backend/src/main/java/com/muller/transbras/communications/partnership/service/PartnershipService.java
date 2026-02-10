package com.muller.transbras.communications.partnership.service;

import com.muller.transbras.communications.partnership.dto.ListPartnershipMsgDTO;
import com.muller.transbras.communications.partnership.dto.NewPartershipMsgDTO;
import com.muller.transbras.communications.partnership.model.Partnership;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
