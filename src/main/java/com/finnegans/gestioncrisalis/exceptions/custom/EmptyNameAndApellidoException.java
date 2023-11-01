package com.finnegans.gestioncrisalis.exceptions.custom;

public class EmptyNameAndApellidoException extends RuntimeException{

    public EmptyNameAndApellidoException(){
        super("Tanto el nombre como el apellido no deben estar vacíos");
    }

    public EmptyNameAndApellidoException(String message){
        super(message);
    }
}
