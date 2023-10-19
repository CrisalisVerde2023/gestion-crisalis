package com.finnegans.gestioncrisalis.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorMessages<T,U> {
    private String exception;
    private T cause;
    private U message;
    private String path;
}
