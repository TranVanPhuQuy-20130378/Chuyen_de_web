package com.example.back_end.services;


import com.example.back_end.dto.UserDto;
import com.example.back_end.dto.UserLoginDto;
import com.example.back_end.dto.UserProfileUpdateDto;
import com.example.back_end.dto.UserRegistrationDto;
import com.example.back_end.models.entities.User;
import com.example.back_end.repos.RoleRepository;
import com.example.back_end.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    public User register(UserRegistrationDto registrationDto) {
        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setPhone(registrationDto.getPhone());
        user.setGender(registrationDto.getGender());
        user.setAddress(registrationDto.getAddress());
        user.setDateOfBirth(registrationDto.getDateOfBirth());

        user.setRole(roleRepository.findById(1L).orElseThrow(() -> new RuntimeException("Default role not found")));

        return userRepository.save(user);
    }

    public Optional<User> login(UserLoginDto loginDto) {
        Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();

    }
    public User updateUserProfile(String email, UserProfileUpdateDto profileUpdateDto) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUsername(profileUpdateDto.getFullname());
            user.setGender(profileUpdateDto.getGender());
            user.setPhone(profileUpdateDto.getPhone());
            user.setEmail(profileUpdateDto.getPersonal_email());
            user.setAddress(profileUpdateDto.getAddress());

            return userRepository.save(user);
        }
        return null;
    }


        public UserDto getUserDtoByEmail(String email) {
            User user = userRepository.findByEmail(email)
                    .orElse(null);

            if (user != null) {
                UserDto userDto = new UserDto();
                userDto.setUsername(user.getUsername());
                userDto.setEmail(user.getEmail());
                userDto.setPhone(user.getPhone());
                userDto.setGender(user.getGender());
                userDto.setAddress(user.getAddress());
                return userDto;
            }

            return null;
        }

}
