package com.finnegans.gestioncrisalis.exceptions.custom;

public class ResourceNotFound extends RuntimeException{
    public ResourceNotFound(String message) {
        super(message);
    }
    public ResourceNotFound(String message, Throwable cause) {
        super(message, cause);
    }
}
