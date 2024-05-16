package com.example.back_end.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {
    @Id
    @Column(name = "product_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "stock_quanlity")
    private Integer stockQuanlity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @OneToMany(mappedBy = "product", orphanRemoval = true, fetch = FetchType.EAGER)
    @Fetch(FetchMode.JOIN)
    private Set<ImageProduct> imageProducts = new HashSet<>();


    @OneToMany(mappedBy = "product", orphanRemoval = true)
    private Set<Commentp> comments = new HashSet<>();

    @Column(name = "img_id")
    private Integer imgId;

    @Column(name = "status")
    private Integer status;

    @Column(name = "view")
    private Integer view;

    @Column(name = "buy")
    private Integer buy;

    @Column(name = "liked")
    private Integer liked;

    @Column(name = "time_create", nullable = false)
    private LocalDateTime timeCreate;

}