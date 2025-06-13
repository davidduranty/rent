import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Professionnal } from '../models/professionnal.model';
import { emailValidators, nameValidators, passwordValidators, siretValidators } from '../utils/validators';

@Component({
  selector: 'app-professionnal',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './professionnal.component.html',
  styleUrl: './professionnal.component.css'
})
export class ProfessionnalComponent {
  @Output() close = new EventEmitter<void>();
  private router = inject(Router);
  newProDTO: Professionnal = {
    name: '',
    siret: '',
    email: '',
    password: '',
    image: ''
  };

  profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, nameValidators()
      // Validators.pattern(/^[a-zA-Z0-9]+$/),
      // Validators.minLength(3),
      // Validators.maxLength(20)
    ]),
    siret: new FormControl('', [
      Validators.required, siretValidators()
      // Validators.pattern(/^[a-zA-Z]+$/),
      // Validators.minLength(4),
      // Validators.maxLength(10)
    ]),
    email: new FormControl('', [
      Validators.required, emailValidators()
      // Validators.email
    ]),
    password: new FormControl('', [
      Validators.required, passwordValidators()
      // Validators.minLength(6)
    ]),
  });

  get nameIsInvalid() {
    return this.profileForm.controls.name.touched && this.profileForm.controls.name.dirty && this.profileForm.controls.name.invalid;
  }
  get surnameIsInvalid() {
    return this.profileForm.controls.name.touched && this.profileForm.controls.name.dirty && this.profileForm.controls.name.invalid;
  }

  get passwordIsInvalid() {
    return this.profileForm.controls.password.touched && this.profileForm.controls.password.dirty && this.profileForm.controls.password.invalid
  }
  get emailIsInvalid() {
    return this.profileForm.controls.password.touched && this.profileForm.controls.password.dirty && this.profileForm.controls.password.invalid
  }

  onSubmit() {

    this.router.navigate(['/home']);

  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  back() {
    this.router.navigate(['/register']);
  }

  onProfessionnal() {
    this.router.navigate(['/professionnal']);
  }
}
