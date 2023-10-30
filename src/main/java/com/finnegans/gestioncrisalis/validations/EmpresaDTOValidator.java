package com.finnegans.gestioncrisalis.validations;

import com.finnegans.gestioncrisalis.dtos.EmpresaDTO;
import org.apache.commons.lang3.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class EmpresaDTOValidator implements ConstraintValidator<ValidEmpresaDTO, EmpresaDTO> {
    @Override
    public boolean isValid(EmpresaDTO empresaDTO, ConstraintValidatorContext context) {
        boolean nombreEmpty = StringUtils.isEmpty(empresaDTO.getNombreDTO());
        boolean cuitEmpty = StringUtils.isEmpty(empresaDTO.getCuitDTO());
        String startDateString = empresaDTO.getStart_dateDTO();
        boolean startDateEmpty = StringUtils.isEmpty(startDateString);

        if (startDateEmpty) {
            throw new IllegalArgumentException("Start date is required.");
        }

        LocalDateTime startDate = null;
        try {
            startDate = DateParser.parseStringToLocalDateTime(startDateString, "yyyy-MM-dd'T'HH:mm:ss");
        } catch (DateTimeParseException e) {
            // Handle the exception, perhaps log an error message
            throw new IllegalArgumentException("Invalid date format for start_date.");
        }

        return !(nombreEmpty || cuitEmpty || startDate == null);
    }
}

