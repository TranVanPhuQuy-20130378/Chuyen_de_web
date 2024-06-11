package com.example.back_end.controller;

import com.example.back_end.dto.UserProfileUpdateDto;
import com.example.back_end.models.entities.User;
import com.example.back_end.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserProfileController {

    @Autowired
    private UserService userService;

    @PutMapping("/changePro5/{email}")
    public ResponseEntity<?> updateUserProfile(@PathVariable String email, @Validated @RequestBody UserProfileUpdateDto profileUpdateDto, BindingResult result) {
//        if (result.hasErrors()) {
//            return ResponseEntity.badRequest().body("Invalid input data.");
//        }

        User updatedUser = userService.updateUserProfile(email, profileUpdateDto);
        if (updatedUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        return ResponseEntity.ok(updatedUser);
    }
}
