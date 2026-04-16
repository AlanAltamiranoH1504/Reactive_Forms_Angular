import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidatedService {
  public namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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
        case 'email':
          return 'El campo de email no es valido';
        case 'pattern':
          if (errors['pattern'].requiredPattern === this.namePattern) {
            return 'El nombre debe tener formato de nombre y apellidos';
          } else if (errors['pattern'].requiredPattern === this.emailPattern) {
            return 'El email no tiene un formato valido';
          } else if (errors['pattern'].requiredPattern === this.notOnlySpacesPattern) {
            return 'El username no puede tener espacios en blanco';
          }
          return "Error de patron contra expresion regular"
        default:
          return 'Error no controlado';
      }
    }
    return null;
  }

  public async checkynServerResponse(control: AbstractControl) {

  }
}
