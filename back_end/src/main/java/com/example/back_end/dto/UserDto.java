package com.example.back_end.dto;

public class UserDto {
    private int user_id;
    private String username;
    private String email;
    private String phone;
    private String gender;
    private String address;

    // Constructors
    public UserDto() {
        // Default constructor
    }

    public UserDto(int user_id, String username, String email, String phone, String gender, String address) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.address = address;
    }

    // Getters and setters
    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
