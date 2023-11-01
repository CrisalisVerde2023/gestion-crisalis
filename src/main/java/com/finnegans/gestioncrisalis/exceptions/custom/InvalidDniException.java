package com.finnegans.gestioncrisalis.exceptions.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidDniException extends ResponseStatusException {
    public InvalidDniException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}