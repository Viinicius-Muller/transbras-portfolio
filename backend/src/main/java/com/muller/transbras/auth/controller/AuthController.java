package com.muller.transbras.auth.controller;

import com.muller.transbras.auth.dto.ListUserDTO;
import com.muller.transbras.auth.dto.LoginDTO;
import com.muller.transbras.auth.dto.RegisterDTO;
import com.muller.transbras.auth.dto.UpdateDTO;
import com.muller.transbras.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDTO dto) {
        authService.loginUser(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO dto) {
        authService.registerUser(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable String id) {
        authService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable String id,
                                 @RequestBody @Valid UpdateDTO dto) {
        authService.updateUser(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping()
    public ResponseEntity<List<ListUserDTO>> listUsers() {
        List<ListUserDTO> users = authService.getUsers();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
}
