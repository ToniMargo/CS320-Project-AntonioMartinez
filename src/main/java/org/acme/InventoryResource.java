package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/inventory")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InventoryResource {

    // GET method for retrieving all inventory items
    @GET
    public List<Inventory> getAll() {
        return Inventory.listAll();
    }

    // GET method for retrieving a single inventory item by id
    @POST
    @Transactional
    public Inventory create(Inventory newInventory) {
        newInventory.persist();
        return newInventory; // returns the created entity with generated id
    }

    // PUT method for updating an existing inventory item by id
    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Inventory updatedInventory) {
        Inventory inventory = Inventory.findById(id);
        if (inventory == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Inventory item with id " + id + " not found").build();
        }
        inventory.description = updatedInventory.description;
        inventory.quantity = updatedInventory.quantity;
        inventory.unit = updatedInventory.unit;
        inventory.persist();
        return Response.ok(inventory).build();
    }

    // DELETE method for removing an inventory item by id
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        Inventory inventory = Inventory.findById(id);
        if (inventory == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Inventory item with id " + id + " not found").build();
        }
        inventory.delete();
        return Response.ok("Inventory item deleted successfully.").build();
    }
}
