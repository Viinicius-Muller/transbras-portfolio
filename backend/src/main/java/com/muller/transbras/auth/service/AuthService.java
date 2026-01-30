package com.muller.transbras.auth.service;

import com.muller.transbras.auth.dto.ListUserDTO;
import com.muller.transbras.auth.dto.LoginDTO;
import com.muller.transbras.auth.dto.RegisterDTO;
import com.muller.transbras.auth.dto.UpdateDTO;
import com.muller.transbras.auth.model.User;
import com.muller.transbras.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private final UserRepository userRepository;

    @Transactional
    public void registerUser(RegisterDTO dto) {
        System.out.println("New user registered");
    }

    public void loginUser(LoginDTO dto) {
        System.out.println("User logged in");
    }

    @Transactional
    public void updateUser(Long id, UpdateDTO dto) throws Exception {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ObjectNotFoundException("User not found", User.class));

        if (user.getPassword() != dto.password()) throw new Exception("Wrong credentials");
        user.updateUser(dto.username(), dto.password());

        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) throw new ObjectNotFoundException("User not found", User.class);
        userRepository.deleteById(id);
    }

    public List<ListUserDTO> getUsers() {
        return userRepository.findAll().stream().map(ListUserDTO::new).toList();
    }
}
