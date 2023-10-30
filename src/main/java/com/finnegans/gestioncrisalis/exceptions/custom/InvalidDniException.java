package com.finnegans.gestioncrisalis.exceptions.custom;

public class InvalidDniException extends RuntimeException {
    public InvalidDniException(String message) {
        super(message);
    }
}