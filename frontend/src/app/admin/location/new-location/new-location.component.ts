import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-location',
  imports: [],
  templateUrl: './new-location.component.html',
  styleUrl: './new-location.component.css'
})
export class NewLocationComponent {
  @Output() close = new EventEmitter<void>();

  onSubmit() { }

  onCancel() {
    this.close.emit();
  }
}
