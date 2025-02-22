package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.LocalDate;
import java.util.List;

/**
 * This is a REST resource class that provides endpoints for managing shipments.
 * It uses JAX-RS annotations to define the endpoints and HTTP methods.
 */
@Path("/shipments")
public class ShipmentResource {

    // Endpoint to retrieve all shipments
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Shipment> getAllShipments(){
        return Shipment.listAll();
    }

    // Endpoint to create a new shipment
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response createShipment(ShipmentDTO shipmentDTO) {
        // 1. Validate that the product exists in inventory (lookup by product name/description)
        Inventory inventory = Inventory.find("description", shipmentDTO.item).firstResult();
        if (inventory == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Product not found in inventory.").build();
        }

        // 2. Validate quantity: must be positive and not exceed available inventory quantity
        if (shipmentDTO.quantity <= 0) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Quantity must be a positive number.").build();
        }
        if (shipmentDTO.quantity > inventory.quantity) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Quantity exceeds available inventory (" + inventory.quantity + ").").build();
        }

        // 3. Validate shipment date: must be today or later
        if (shipmentDTO.date.isBefore(LocalDate.now())) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Shipment date cannot be in the past.").build();
        }

        // 4. Create the shipment
        Shipment shipment = new Shipment();
        shipment.date = shipmentDTO.date;
        shipment.item = shipmentDTO.item;
        shipment.quantity = shipmentDTO.quantity;
        shipment.persist();

        // Optionally update inventory: subtract the shipment quantity from available inventory
        inventory.quantity -= shipmentDTO.quantity;
        inventory.persist();

        return Response.ok("Shipment created successfully.").build();
    }
}
