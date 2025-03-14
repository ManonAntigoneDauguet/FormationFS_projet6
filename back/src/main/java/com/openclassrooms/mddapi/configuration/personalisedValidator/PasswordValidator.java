package com.openclassrooms.mddapi.configuration.personalisedValidator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import static com.openclassrooms.mddapi.common.Utils.*;

public class PasswordValidator implements ConstraintValidator<PasswordConstraint, String> {

    @Override
    public void initialize(PasswordConstraint constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value.length() >= 8 &&
                isContainsLowercaseLetter(value) &&
                isContainsUppercaseLetter(value) &&
                isContainsNumber(value) &&
                isContainsSpecialCharacter(value);
    }
}
