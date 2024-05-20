package com.example.back_end

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

@Entity
@Table(name = "brands")
open class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_brand", nullable = false)
    open var id: Long? = null

    @Size(max = 255)
    @NotNull
    @Column(name = "name_brand", nullable = false)
    open var nameBrand: String? = null
}