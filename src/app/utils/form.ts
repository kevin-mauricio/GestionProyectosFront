import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormUtil {

    constructor() { }

    isRequired(formControl: AbstractControl | null, isInvalidForm: boolean): string {
        let isDisabled = false;
        if (formControl?.disabled) {
            formControl.enable();
            isDisabled = true;
        }
        const isInvalid = isInvalidForm && formControl?.invalid && formControl?.hasValidator(Validators.required);

        if (isDisabled) {
            formControl?.disable();
        }

        return isInvalid ? 'ng-dirty ng-invalid' : '';
    }
}
