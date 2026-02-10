package com.muller.transbras.shippings.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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

    @Column(name = "origin", nullable = false)
    private String from;

    @Column(name = "destination", nullable = false)
    private String to;

    @Column(nullable = false)
    private String cargoType;

    @Column(nullable = false)
    @Min(1)
    @Max(1000000)
    private Integer weight;

    @Column(nullable = false)
    @Min(20)
    @Max(10000)
    private Integer distance;
}
