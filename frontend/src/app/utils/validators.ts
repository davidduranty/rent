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
        today.setHours(0,0,0,0);
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
