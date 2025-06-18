import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() visible = false;


  close() {
    this.visible = false;
  }

  confirm() {
    // action à déclencher
    this.visible = false;
  }

  deactivate() {
    // action à déclencher
    this.visible = false;
    window.location.reload();
  }

}
