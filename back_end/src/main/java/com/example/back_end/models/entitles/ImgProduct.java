package com.example.back_end.models.entitles;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "img_product")
public class ImgProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "name_img")
    private String nameImg;

    @Size(max = 255)
    @Column(name = "image_url")
    private String imageUrl;

}