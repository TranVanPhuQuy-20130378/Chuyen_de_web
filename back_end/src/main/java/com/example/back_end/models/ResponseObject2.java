package com.example.back_end.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseObject2 {
    private String status;
    private String message;
    private String total;
    @JsonProperty("data")
    private Object object;
}