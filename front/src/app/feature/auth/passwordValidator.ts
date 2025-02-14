import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formValue = control.value;

        const hasUpperCase = /[A-Z]/.test(formValue);
        const hasLowerCase = /[a-z]/.test(formValue);
        const hasNumber = /[0-9]/.test(formValue);
        const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(formValue);

        return hasNumber && hasLowerCase && hasUpperCase && hasSpecialCharacter
            ? null
            : { password: { value: control.value } }
    }
}