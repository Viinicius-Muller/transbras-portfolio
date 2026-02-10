package com.muller.transbras.shippings.model;

import com.muller.transbras.shippings.dto.UpdateShippingDTO;
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

    public void update(UpdateShippingDTO dto) {
        if (dto.scheduledDate() != null) this.scheduledDate = dto.scheduledDate();
        if (dto.from() != null) this.from = dto.from();
        if (dto.to() != null) this.to = dto.to();
        if (dto.cargoType() != null) this.cargoType = dto.cargoType();
        if (dto.weight() != null) this.weight = dto.weight();
        if (dto.distance() != null) this.distance = dto.distance();
    }
}
