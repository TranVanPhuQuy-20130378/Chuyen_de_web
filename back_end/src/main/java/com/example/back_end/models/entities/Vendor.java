package com.example.back_end.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

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

    @OneToMany(mappedBy = "vendor")
    @JsonIgnore
    private Set<Product> products = new LinkedHashSet<>();

}