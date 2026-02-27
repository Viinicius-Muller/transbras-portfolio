package com.muller.transbras.auth.controller;

import com.muller.transbras.auth.dto.*;
import com.muller.transbras.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
    public ResponseEntity<ResponseDTO> login(@RequestBody @Valid LoginDTO dto) {
        ResponseDTO responseDTO = authService.loginUser(dto);
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody @Valid RegisterDTO dto) {
        ResponseDTO responseDTO = authService.registerUser(dto);
        return ResponseEntity.ok().body(responseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id,
                                       @RequestHeader("authorization") String tokenHeader) {
        authService.deleteUser(id, tokenHeader);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                 @RequestBody @Valid UpdateDTO dto) throws Exception {
        authService.updateUser(id, dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity<List<ListUserDTO>> listUsers() {
        List<ListUserDTO> users = authService.getUsers();
        return ResponseEntity.ok().body(users);
    }
}
