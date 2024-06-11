package com.example.back_end.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


    @Getter
    @Setter
    public class UserProfileUpdateDto {
        @NotBlank(message = "Họ và tên không được để trống")
        private String fullname;

        @NotBlank(message = "Giới tính không được để trống")
        private String gender;

        @NotBlank(message = "Số điện thoại không được để trống")
        private String phone;

        @NotBlank(message = "Email không được để trống")
        private String personal_email;

        @NotBlank(message = "Địa chỉ không được để trống")
        private String address;

    }

