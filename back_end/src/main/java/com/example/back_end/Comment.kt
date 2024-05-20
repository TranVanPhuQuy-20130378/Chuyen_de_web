package com.example.back_end

import com.example.back_end.models.entities.Product
import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "comment")
open class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", nullable = false)
    open var id: Int? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    open var product: Product? = null

    @Lob
    @Column(name = "content")
    open var content: String? = null

    @Column(name = "create_at")
    open var createAt: LocalDate? = null
}