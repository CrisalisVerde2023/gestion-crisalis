package com.finnegans.gestioncrisalis.validations;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {EmpresaDTOValidator.class})
public @interface ValidEmpresaDTO {
    String message() default "Los campos de la empresa deben ser válidos.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
