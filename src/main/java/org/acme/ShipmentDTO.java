package org.acme;

import java.time.LocalDate;

/**
 * This is a simple data transfer object (DTO) class that represents a shipment.
 * It contains fields for the shipment date, item, and quantity.
 */
public class ShipmentDTO {
    public LocalDate date;
    public String item;
    public int quantity;
}
