import { Component, EventEmitter, Output, inject } from '@angular/core';
import { User } from '../models/user.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidators, PasswordValidators } from '../utils/validators';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  private router = inject(Router);
  userDTO: User = {
    email: '',
    password: ''
  };



  profileForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, emailValidators()
      // Validators.email,
      // Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|fr|net|org|io|eu)$/i)
    ]),
    password: new FormControl('', [Validators.required,
    PasswordValidators.minLength(6),
      // Validators.minLength(6)])
    ]),
  });
  get emailIsInvalid() {
    return this.profileForm.controls.email.touched && this.profileForm.controls.email.dirty && this.profileForm.controls.email.invalid
  }
  get passwordIsInvalid() {
    return this.profileForm.controls.password.touched && this.profileForm.controls.password.dirty && this.profileForm.controls.password.invalid
  }
  onCancel(): void {
    // this.close.emit()
    this.router.navigate(['/home']);
  }
  onSubmit() {
    const email = this.profileForm.value.email;
    if (this.profileForm.invalid) {
      console.log('Veuillez remplir tous les champs');
    } else if (email?.includes('@admin.com')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  }
  register() {
    this.router.navigate(['/register']);
  }

  loginLost() {
    this.router.navigate(['find-email'])
  }
}
