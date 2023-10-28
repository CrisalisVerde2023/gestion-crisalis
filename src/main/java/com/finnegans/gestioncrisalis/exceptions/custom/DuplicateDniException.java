package com.finnegans.gestioncrisalis.exceptions.custom;

public class DuplicateDniException extends RuntimeException {
    public DuplicateDniException(){
        super("Ya existe una persona con el mismo DNI");
    }

    public DuplicateDniException(String message) {
        super(message);
    }

    public DuplicateDniException(String message, Throwable cause){
        super(message, cause);
    }
}
