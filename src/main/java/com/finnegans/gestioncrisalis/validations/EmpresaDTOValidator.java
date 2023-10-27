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

        LocalDateTime startDate = null;
        if (!startDateEmpty) {
            try {
                startDate = DateParser.parseStringToLocalDateTime(startDateString, "yyyy-MM-dd'T'HH:mm:ss");
            } catch (DateTimeParseException e) {
                // Handle the exception, perhaps log an error message
                return false;
            }
        }

        return !(nombreEmpty || cuitEmpty || startDateEmpty || startDate == null);
    }
}

