package com.finnegans.gestioncrisalis.validations;

import com.finnegans.gestioncrisalis.dtos.UsuarioDTO;
import org.apache.commons.lang3.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UsuarioDTOValidator implements ConstraintValidator<ValidUsuarioDTO, UsuarioDTO> {
    @Override
    public boolean isValid(UsuarioDTO usuarioDTO, ConstraintValidatorContext context) {
        boolean usuarioEmpty = StringUtils.isEmpty(usuarioDTO.getUsuarioDTO());
        boolean passwordEmpty = StringUtils.isEmpty(usuarioDTO.getPasswordDTO());
        return !(usuarioEmpty && passwordEmpty);
    }
}
