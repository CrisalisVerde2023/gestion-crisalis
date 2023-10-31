package com.finnegans.gestioncrisalis.exceptions;

import com.finnegans.gestioncrisalis.exceptions.custom.InvalidDataException;
import com.finnegans.gestioncrisalis.exceptions.custom.MissingDataException;
import com.finnegans.gestioncrisalis.exceptions.custom.DataIntegrityException;

import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.exceptions.custom.UserDisabled;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestControllerAdvice
public class ExceptionHandlerNotValids {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ErrorMessages handleNotValids(MethodArgumentNotValidException notValidException, HttpServletRequest request){
        Map<String,String> errorMap = new HashMap<>();

        Optional.ofNullable(notValidException.getBindingResult().getAllErrors())
        .ifPresentOrElse(
            errors -> errors.forEach(error -> errorMap.put(error.getObjectName(), error.getDefaultMessage())),
            () -> notValidException.getBindingResult().getFieldErrors()
                .forEach(error -> errorMap.put(error.getField(),error.getDefaultMessage()))
        );

        return new ErrorMessages(notValidException.getClass().getSimpleName(), notValidException.getCause(), errorMap, request.getRequestURI());
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseBody
    public ErrorMessages handleConstraints(Exception exception, HttpServletRequest request){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("error_message",exception.getMessage());

        return new ErrorMessages(exception.getClass().getSimpleName(), exception.getCause(), errorMap, request.getRequestURI());
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentTypeMismatchException.class, DataIntegrityViolationException.class})
    @ResponseBody
    public ErrorMessages handleTypeMismatch(Exception exception, HttpServletRequest request){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("error_message",exception.getMessage());

        return new ErrorMessages(exception.getClass().getSimpleName(), exception.getCause().getMessage(), errorMap, request.getRequestURI());
    }
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFound.class)
    @ResponseBody
    public ErrorMessages handleResourseNotFound(ResourceNotFound exception, HttpServletRequest request){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("error_message",exception.getMessage());

        return new ErrorMessages(exception.getClass().getSimpleName(), exception.getMessage(), errorMap, request.getRequestURI());
    }
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    @ExceptionHandler(MessagingException.class)
    @ResponseBody
    public ErrorMessages handleMessaging(MessagingException exception, HttpServletRequest request){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("error_message",exception.getMessage());

        return new ErrorMessages(exception.getClass().getSimpleName(), exception.getMessage(), errorMap, request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(UserDisabled.class)
    @ResponseBody
    public ErrorMessages handleUserDisabled(UserDisabled exception, HttpServletRequest request){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("error_message",exception.getMessage());

        return new ErrorMessages(exception.getClass().getSimpleName(), exception.getMessage(), errorMap, request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
        MissingDataException.class,
        InvalidDataException.class
    })
    @ResponseBody
    public ErrorMessage notFound(HttpServletRequest request, Exception exception) {
        return new ErrorMessage(exception, request.getRequestURI());
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DataIntegrityException.class)
    @ResponseBody
    public ErrorMessages handleDataIntegrity(DataIntegrityException exception, HttpServletRequest request){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("error_message",exception.getMessage());

        return new ErrorMessages(exception.getClass().getSimpleName(), exception.getMessage(), errorMap, request.getRequestURI());
    }
}
