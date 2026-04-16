import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatedService } from '../../../services/forma-validated-service';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  protected formBuilder = inject(FormBuilder);
  protected formValidatorService = inject(FormValidatedService);

  protected registerForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(3), Validators.pattern(this.formValidatorService.namePattern)]],
    email: ["", [Validators.required, Validators.pattern(this.formValidatorService.emailPattern)]],
    username: ["", [Validators.required, Validators.minLength(6), Validators.pattern(this.formValidatorService.notOnlySpacesPattern)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmedPassword: [null, [Validators.required]]
  }, {
    Validators: {

    }
  });

  protected onSubmit() {
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log("Extrauendo la data");
    
  }

  protected isFieldOneEqualsFieldTwo(fieldOne: string, fieldTwo: string) {
    () => {
      
    }
    return null;
  }

}
