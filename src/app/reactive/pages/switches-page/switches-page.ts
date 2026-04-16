import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatedService } from '../../../services/forma-validated-service';

@Component({
  selector: 'app-switches-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './switches-page.html',
  styleUrl: './switches-page.css',
})
export class SwitchesPage {
  protected formValidatorService = inject(FormValidatedService);

  protected formBuilder = inject(FormBuilder);
  protected formSwitches: FormGroup = this.formBuilder.group({
    gender: ["M", [Validators.required]], // Radio button default de genero 
    wantNotifications: [true], // Radio button de notificaciones por default a true
    termsAndConditions: [false, Validators.requiredTrue]
  });

  onSubmit() {
    this.formSwitches.markAllAsTouched()
    
  }
}
