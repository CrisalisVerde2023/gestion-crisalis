package com.finnegans.gestioncrisalis.exceptions.custom;

public class MissingDataException extends RuntimeException{
    public MissingDataException(String message){
        super(message);
    }   
}