package com.muller.transbras.auth.infra.security;

import com.muller.transbras.auth.model.User;
import com.muller.transbras.auth.model.UserRole;
import com.muller.transbras.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {
    @Value("${app.security.admin.password}")
    private String adminPass;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Bean
    public CommandLineRunner createAdminAcc() {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User adminUser = new User();
                adminUser.setUsername("admin");
                adminUser.setPassword(passwordEncoder.encode(adminPass)); // Encode the password
                adminUser.setRole(UserRole.ADMIN);
                userRepository.save(adminUser);
                System.out.println("Default admin account created.");
            }
        };
    }

}
