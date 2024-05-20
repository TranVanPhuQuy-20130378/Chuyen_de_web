package com.example.back_end.models.entities;

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
@Table(name = "role")
public class Role {
    @Id

    @Column(name = "role_id", nullable = false)
    private Integer id;

    @Size(max = 50)
    @Column(name = "role_name", length = 50)
    private String roleName;

}