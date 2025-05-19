import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-new-user',
  imports: [FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  @Output() close = new EventEmitter<void>();
  private userService = inject(UserService);
  newUserDTO: User = {
    name: '',
    surname: '',
    email: '',
    password: '',
    birthday: '',
    isAdmin: false,
    professionnal: false
  };

  onSubmit() {
    this.userService.addUser(this.newUserDTO)
    this.close.emit();

  }

  onCancel() {
    this.close.emit();
  }
}
