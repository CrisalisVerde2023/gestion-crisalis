package com.finnegans.gestioncrisalis.exceptions.custom;

public class InvalidDataException extends RuntimeException{
    public InvalidDataException(String message) {
        super(message);
    }
}