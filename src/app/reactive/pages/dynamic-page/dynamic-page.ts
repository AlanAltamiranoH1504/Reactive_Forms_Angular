import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormValidatedService } from '../../../services/forma-validated-service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
  styleUrl: './dynamic-page.css',
})
export class DynamicPage {
  protected formBuilder = inject(FormBuilder);
  protected formValidatedService = inject(FormValidatedService);
  protected newFavoriteGame = this.formBuilder.control("", [Validators.required, Validators.minLength(2)]);

  protected myFormDynamicPage: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array(
      [
        ['GOW', [Validators.required, Validators.minLength(2)]], // Validacion x campos de array
        ['GOW2', [Validators.required, Validators.minLength(2)]],
      ],
      Validators.min(3),// Validacion por el array
    ), 
  });

  protected onSubmit() {
    if (this.myFormDynamicPage.invalid) {
      this.myFormDynamicPage.markAllAsTouched();
      return;
    }
    // ! Enviamos el formulario al backend y reseteamos el formulario
    this.myFormDynamicPage.reset();
  }

  protected get favoriteGames(){
    return this.myFormDynamicPage.get("favoriteGames") as FormArray;
  }

  protected onAddToFavorites() {
    if(this.newFavoriteGame.invalid) {
      this.myFormDynamicPage.markAllAsTouched();  
      return;
    }

    const newGame = this.newFavoriteGame.value;
    this.favoriteGames.push(this.formBuilder.control(newGame, Validators.required));
    this.newFavoriteGame.reset();
  }

  protected deleteFavoriteGame(i: number) {
    this.favoriteGames.removeAt(i);
  }
}
