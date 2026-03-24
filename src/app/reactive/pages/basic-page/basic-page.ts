import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
  styleUrl: './basic-page.css',
})
export class BasicPage {
  protected formBuilder = inject(FormBuilder);
  protected myForm: FormGroup = this.formBuilder.group({
    nameProduct: ['', [Validators.required, Validators.minLength(3)]],
    priceProduct: [0, [Validators.required, Validators.min(1)]],
    inStorageProduct: [0, [Validators.required, Validators.min(1)]],
  });

  protected isValidField(fieldName: string): boolean | null {
    return !!this.myForm.controls[fieldName].errors;
  }

  protected getFieldError(fieldName: string): string | null {
    if (!this.myForm.controls[fieldName]) return null;
    const errors = this.myForm.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `El campo debe tener minimo ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `El valor minimo del campo debe ser ${errors["min"].min}`;
      }
    }
    return null;
  }
}
