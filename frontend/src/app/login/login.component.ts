import { Component, EventEmitter, Output, inject } from '@angular/core';
import { User } from '../models/user.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
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
    if (this.userDTO.email === '' || this.userDTO.password === '') {
      console.log('Veuillez remplir tous les champs');
    } else if (this.userDTO.email.includes('@admin.com')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
