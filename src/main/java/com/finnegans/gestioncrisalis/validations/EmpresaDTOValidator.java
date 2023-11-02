package com.finnegans.gestioncrisalis.validations;

import com.finnegans.gestioncrisalis.dtos.EmpresaDTO;
import org.apache.commons.lang3.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import java.text.ParseException;
import java.util.Date;

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

        Date startDate = null;
        try {
            startDate = DateParser.parseStringToDate(startDateString, "yyyy-MM-dd");
        } catch (ParseException e) {
            // Handle the exception, perhaps log an error message
            throw new IllegalArgumentException("Invalid date format for start_date.");
        }

        return !(nombreEmpty || cuitEmpty || startDate == null);
    }
}

