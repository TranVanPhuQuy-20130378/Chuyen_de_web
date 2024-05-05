package com.example.back_end.models.entitles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "vendor")
public class Vendor {
    @Id
    @Column(name = "vendor_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "vendor_name")
    private String vendorName;

    @Size(max = 255)
    @Column(name = "vendor_location")
    private String vendorLocation;

}