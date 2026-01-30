package com.muller.transbras.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    public void registerUser() {
        System.out.println("New user registered");
    }

    public void loginUser() {
        System.out.println("User logged in");
    }

    public void updateUser() {
        System.out.println("User info updated");
    }

    public void deleteUser() {
        System.out.println("User deleted");
    }
}
