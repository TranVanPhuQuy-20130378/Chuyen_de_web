package com.example.back_end.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "banner")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "banner_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "banner_image_url")
    private String bannerImageUrl;

    @Column(name = "status")
    private Integer status;

}