import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Professionnal } from '../models/professionnal.model';

@Component({
  selector: 'app-professionnal',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './professionnal.component.html',
  styleUrl: './professionnal.component.css'
})
export class ProfessionnalComponent {
  @Output() close = new EventEmitter<void>();
  private userService = inject(UserService);
  private router = inject(Router);
  newProDTO: Professionnal = {
    name: '',
    siret: '',
    email: '',
    password: '',
  };

  profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+$/),
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    siret: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/),
      Validators.minLength(4),
      Validators.maxLength(10)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
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
    this.userService.addUser(this.newProDTO)
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
