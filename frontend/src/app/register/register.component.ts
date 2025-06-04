import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() close = new EventEmitter<void>();
  private userService = inject(UserService);
  private router = inject(Router);
  newUserDTO: User = {
    name: '',
    surname: '',
    email: '',
    password: '',
    birthday: '',
  };

  profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/),
      Validators.minLength(4),
      Validators.maxLength(10)
    ]),
    surname: new FormControl('', [
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
    birthday: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)
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
    this.userService.addUser(this.newUserDTO)
    this.router.navigate(['/home']);

  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  onProfessionnal() {
    this.router.navigate(['/professionnal']);
  }
}
