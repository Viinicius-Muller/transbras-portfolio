package com.muller.transbras.communications.apply.service;

import com.muller.transbras.communications.apply.dto.ListApplianceDTO;
import com.muller.transbras.communications.apply.dto.NewApplianceDTO;
import com.muller.transbras.communications.apply.model.Appliance;
import com.muller.transbras.communications.apply.repository.ApplianceRepository;
import com.muller.transbras.communications.exceptions.MessageNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplianceService {
    @Autowired
    private ApplianceRepository applianceRepository;

    public ListApplianceDTO registerAppliance(NewApplianceDTO dto) {
        Appliance appliance = new Appliance();
        String fullname = dto.firstName().trim() + " " + dto.lastName().trim();

        appliance.setFullname(fullname);
        appliance.setEmail(dto.email());
        appliance.setPhoneNumber(dto.phoneNumber());
        appliance.setMessage(dto.message());
        applianceRepository.save(appliance);

        return new ListApplianceDTO(appliance);
    }

    public void deleteAppliance(Long id) {
        if (!applianceRepository.existsById(id))
            throw new MessageNotFoundException("Appliance with id " + id + " not found.");

        applianceRepository.deleteById(id);
    }

    public List<ListApplianceDTO> getAppliances() {
        return applianceRepository.findAll().stream().map(ListApplianceDTO::new).toList();
    }
}
