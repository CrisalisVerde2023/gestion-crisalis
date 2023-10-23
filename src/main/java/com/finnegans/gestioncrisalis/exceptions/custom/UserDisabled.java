package com.finnegans.gestioncrisalis.exceptions.custom;

public class UserDisabled extends RuntimeException{
    public UserDisabled() {
        super("El usuario se encuentra deshabilitado.");
    }
}
