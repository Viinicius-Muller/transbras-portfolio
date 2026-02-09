package com.muller.transbras.shippings.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Table(name = "shippings")
@Data
public class Shipping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Instant scheduledDate;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private String from;

    @Column(nullable = false)
    private String to;

    @Column(nullable = false)
    private String cargoType;

    @Column(nullable = false)
    private Integer weight;

    @Column(nullable = false)
    private Integer distance;
}
