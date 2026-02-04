package com.muller.transbras.auth.service;

import com.muller.transbras.auth.dto.*;
import com.muller.transbras.auth.infra.security.TokenService;
import com.muller.transbras.auth.model.User;
import com.muller.transbras.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @Transactional
    public ResponseDTO registerUser(RegisterDTO dto) {
        User user = new User();
        String encodedPass = passwordEncoder.encode(dto.password());

        user.setUsername(dto.username());
        user.setPassword(dto.password());

        var token = tokenService.generateToken(user);
        userRepository.save(user);

        return new ResponseDTO(user.getUsername(), token);
    }

    public ResponseDTO loginUser(LoginDTO dto) {
        User user = userRepository.findByUsername(dto.username())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(dto.password(), user.getPassword())) {
            var token = tokenService.generateToken(user);
            return new ResponseDTO(user.getUsername(), token);
        }
        throw new RuntimeException("Username or Password are incorrect");
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
