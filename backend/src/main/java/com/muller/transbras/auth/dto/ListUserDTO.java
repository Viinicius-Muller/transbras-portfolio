package com.muller.transbras.auth.dto;

import com.muller.transbras.auth.model.User;

public record ListUserDTO(
        Long id,
        String username
) {
    public ListUserDTO(User data) {
        this(data.getId(),
                data.getUsername());
    }
}
