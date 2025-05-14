import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  imports: [FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  @Output() close = new EventEmitter<void>();

  onSubmit() {
    this.close.emit();

  }

  onCancel() {
    this.close.emit();
  }
}
