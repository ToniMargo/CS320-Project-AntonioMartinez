package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory extends PanacheEntity {
    public String description;
    public int quantity;
    public String unit;
}
