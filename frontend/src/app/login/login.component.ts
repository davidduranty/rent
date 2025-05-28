import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  userDTO: User = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };
  onCancel() {
    this.close.emit()
  }
  onSubmit() {
    this.close.emit()

  }

}
