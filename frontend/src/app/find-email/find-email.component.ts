import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Lost, User } from '../models/user.model';
import { emailValidators } from '../utils/validators';

@Component({
  selector: 'app-find-email',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './find-email.component.html',
  styleUrl: './find-email.component.css'
})
export class FindEmailComponent {
  @Output() close = new EventEmitter<void>();
  private router = inject(Router);
  lostDTO: Lost = {
    email: '',
  };



  profileForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, emailValidators()
      // Validators.email,
      // Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|fr|net|org|io|eu)$/i)
    ]),
  });
  get emailIsInvalid() {
    return this.profileForm.controls.email.touched && this.profileForm.controls.email.dirty && this.profileForm.controls.email.invalid
  }

  retry(): void {
    // this.close.emit()
    this.router.navigate(['/login']);
  }
  onSubmit() {
    // if (this.userDTO.email === '' || this.userDTO.password === '') {
    //   console.log('Veuillez remplir tous les champs');
    // } else if (this.userDTO.email.includes('@admin.com')) {
    //   this.router.navigate(['/admin']);
    // } else {
    //   this.router.navigate(['/user']);
    // }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
