package com.example.back_end.controller;


import com.example.back_end.dto.ChangePasswordDto;
import com.example.back_end.dto.UserLoginDto;
import com.example.back_end.dto.UserRegistrationDto;
import com.example.back_end.models.entities.User;
import com.example.back_end.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto registrationDto) {
        User user = userService.register(registrationDto);
        return ResponseEntity.ok(user);
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDto loginDto) {
        Optional<User> userOptional = userService.login(loginDto);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(401).body("Thông tin đăng nhập không hợp lệ");
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam String email, @RequestBody ChangePasswordDto changePasswordDto) {
        boolean success = userService.changePasswordByEmail(email, changePasswordDto.getNewPassword());
        if (success) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.status(400).body("Account not found or update failed");
        }
    }
}

