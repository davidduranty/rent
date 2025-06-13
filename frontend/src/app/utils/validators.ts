import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value !== null && control.value !== '' ? null : { required: true };
  };
}

export function dateIsTodayOrLater(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(control.value);
    return selectedDate >= today ? null : { dateInvalid: true };
  };
}

export function endDateAfterStartDate(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    if (!start || !end) return null;
    return new Date(end) > new Date(start) ? null : { dateOrderInvalid: true };
  };
}

export function emailValidators(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  };
}

export function passwordValidators(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // const password = control.value;
    if (!control.value) return null;
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasNumber = /\d/.test(control.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    const isValidLength = control.value.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength
      ? null
      : { invalidPassword: true };
  };
}
export function nameValidators(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nameRegex = /^[a-zA-Z0-9]+$/;
    const minLength = 3;
    const maxLength = 20;
    if (!control.value) return null;
    if (control.value.length < minLength || control.value.length > maxLength) {
      return { invalidName: true };
    }
    return nameRegex.test(control.value) ? null : { invalidName: true };

  };
}

export function siretValidators(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const siretRegex = /^[0-9]{14}$/;
    if (!control.value) return null;
    if (!siretRegex.test(control.value)) {
      return { invalidSiret: true };
    }
    return null;
  };
}

export function birthdayValidators(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthdayRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!control.value) return null;
    if (!birthdayRegex.test(control.value)) {
      return { invalidBirthday: true };
    }
    return null;
  };
}
