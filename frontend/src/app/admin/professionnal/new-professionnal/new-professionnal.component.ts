import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessionnalService } from '../../../services/professionnal.service';
import { Professionnal } from '../../../models/professionnal.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-professionnal',
  imports: [FormsModule],
  templateUrl: './new-professionnal.component.html',
  styleUrl: './new-professionnal.component.css'
})
export class NewProfessionnalComponent {
  @Output() close = new EventEmitter<void>();

  private professionnalService = inject(ProfessionnalService);
  newProDTO: Professionnal = {
    name: '',
    siret: '',
    email: '',
    password: '',
    image: '',
  };
  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.professionnalService.addPro(this.newProDTO)
    this.close.emit();
    window.location.reload();
  }

}
