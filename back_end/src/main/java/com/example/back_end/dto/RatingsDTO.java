package com.example.back_end.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class RatingsDTO {
    private int id;
    private String name;
    private Integer star;
    private LocalDate create_at;
    private String comment;
    // Builder và các phương thức khác
}