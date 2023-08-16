import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordValidationService {
  passwordErrorMessages = {
    invalidLength: 'Password must be between 8 and 20 characters long.',
    invalidCharacters:
      'Password must contain at least one lowercase letter, one uppercase letter, and one special character.',
  };

  validatePassword = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    const lengthRegex = /^(?=.{8,20}$).*/;
    const characterRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;

    if (!lengthRegex.test(value)) {
      return {
        invalidLength: this.passwordErrorMessages.invalidLength,
      };
    }

    if (!characterRegex.test(value)) {
      return {
        invalidCharacters: this.passwordErrorMessages.invalidCharacters,
      };
    }

    return null;
  };
}
