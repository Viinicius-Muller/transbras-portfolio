package com.muller.transbras.auth.service;

import com.muller.transbras.auth.dto.LoginDTO;
import com.muller.transbras.auth.dto.RegisterDTO;
import com.muller.transbras.auth.dto.UpdateDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Transactional
    public void registerUser(RegisterDTO dto) {
        System.out.println("New user registered");
    }

    public void loginUser(LoginDTO dto) {
        System.out.println("User logged in");
    }

    @Transactional
    public void updateUser(UpdateDTO dto) {
        System.out.println("User info updated");
    }

    @Transactional
    public void deleteUser() {
        System.out.println("User deleted");
    }

    public void getUsers() {
        System.out.println("users");
    }
}
