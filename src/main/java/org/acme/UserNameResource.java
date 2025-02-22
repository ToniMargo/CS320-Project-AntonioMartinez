package org.acme;

import jakarta. transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

// UNUSED COMPONENT - FOR DEMONSTRATION PURPOSES ONLY
@Path("/user")
public class UserNameResource {
    // Create
    @POST
    @Path ("/{name}")
    @Produces (MediaType.TEXT_PLAIN)
    @Transactional
    public String createUser(@PathParam ("name") String name) {
        UserName userName = new UserName(name); // Create a new UserName entity from the path parameter
        userName.persist(); // Add the UserName entity to the database
        return "Hello " + name + "! Your name has been stored in the database.";
    }

    // Read (version 2) - returns names and ids
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserName> getNames() {
        // Return a list of all names in the database
        return UserName.listAll();
    }

    // Update
    @PATCH
    @Path ("/{id}")
    @Produces (MediaType.TEXT_PLAIN)
    @Transactional
    public String updateName(@PathParam("id") String id, String newName) {
        UserName userName = UserName.findById(id); // Find the UserName entity with the given id
        String oldName = userName.name; // Update the name of the UserName entity
        userName.name = newName; // Update the UserName entity in the database
        return "'" + oldName + "' has been updated to '" + newName + "' in the database.";
    }

    // Delete
    @DELETE
    @Path ("/{id}")
    @Produces (MediaType.TEXT_PLAIN)
    @Transactional
    public String deleteName(@PathParam("id") String id) {
        UserName userName = UserName.findById(id); // Find the UserName entity with the given id
        userName.delete(); // Delete the UserName entity from the database
        return userName.name + " has been deleted from the database.";
    }
}

