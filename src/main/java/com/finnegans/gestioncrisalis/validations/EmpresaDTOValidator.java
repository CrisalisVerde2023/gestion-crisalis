package com.finnegans.gestioncrisalis.validations;

import com.finnegans.gestioncrisalis.dtos.EmpresaDTO;
import org.apache.commons.lang3.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EmpresaDTOValidator implements ConstraintValidator<ValidEmpresaDTO, EmpresaDTO> {
    @Override
    public boolean isValid(EmpresaDTO empresaDTO, ConstraintValidatorContext context) {
        boolean nombreEmpty = StringUtils.isEmpty(empresaDTO.getNombreDTO());
        boolean cuitEmpty = StringUtils.isEmpty(empresaDTO.getCuitDTO());
        return !(nombreEmpty && cuitEmpty);
    }
}
