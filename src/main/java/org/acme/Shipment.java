package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "shipments")
public class Shipment extends PanacheEntity {
    public LocalDate date;
    public String item;
    public int quantity;
}
