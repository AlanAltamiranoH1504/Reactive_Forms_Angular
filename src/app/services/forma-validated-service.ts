import { Injectable } from '@angular/core';
import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidatedService {
  public isValidField(fieldName: string, myForm: FormGroup) {
    return myForm.controls[fieldName].errors && myForm.controls[fieldName].touched;
  }

  public isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  public getFieldError(fieldName: string, myForm: FormGroup) {
    if (!myForm.controls[fieldName]) return null;
    const errors = myForm.controls[fieldName].errors ?? {};
    return this.getTextError(errors);
  }

  public getFieldErrorInArray(formArray: FormArray, index: number) {
    if (!formArray.controls[index]) return null;
    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);
  }

  public getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `El campo debe tener minimo ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `El valor minimo del campo debe ser ${errors['min'].min}`;
      }
    }
    return null;
  }
}
