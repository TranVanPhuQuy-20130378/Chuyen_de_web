package com.example.back_end.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "vendor")
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "vendor_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "vendor_name")
    private String vendorName;

    @Size(max = 255)
    @Column(name = "vendor_location")
    private String vendorLocation;

}