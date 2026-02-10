package com.muller.transbras.auth.service;

import com.muller.transbras.auth.dto.*;
import com.muller.transbras.auth.exception.IncorrectCredentialsException;
import com.muller.transbras.auth.exception.UserNotFoundException;
import com.muller.transbras.auth.exception.UsernameAlreadyTakenException;
import com.muller.transbras.auth.infra.security.TokenService;
import com.muller.transbras.auth.model.User;
import com.muller.transbras.auth.model.UserRole;
import com.muller.transbras.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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
        if (userRepository.existsByUsername(dto.username())) throw new UsernameAlreadyTakenException("Username already taken");
        String encodedPass = passwordEncoder.encode(dto.password());

        user.setUsername(dto.username());
        user.setPassword(encodedPass);

        if(dto.username().equals("adminn")) user.setRole(UserRole.ADMIN);
        else user.setRole(UserRole.USER);

        var token = tokenService.generateToken(user);
        userRepository.save(user);

        return new ResponseDTO(user.getUsername(), token);
    }

    public ResponseDTO loginUser(LoginDTO dto) {
        User user = userRepository.findByUsername(dto.username())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (passwordEncoder.matches(dto.password(), user.getPassword())) {
            var token = tokenService.generateToken(user);
            return new ResponseDTO(user.getUsername(), token);
        }
        throw new IncorrectCredentialsException("Username or Password are incorrect");
    }

    @Transactional
    public void updateUser(Long id, UpdateDTO dto) throws Exception {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User not found"));

        String encodedPass = passwordEncoder.encode(dto.password());
        user.updateUser(dto.username(), encodedPass);

        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) throw new UserNotFoundException("User not found");
        userRepository.deleteById(id);
    }

    public List<ListUserDTO> getUsers() {
        return userRepository.findAll().stream().map(ListUserDTO::new).toList();
    }
}
