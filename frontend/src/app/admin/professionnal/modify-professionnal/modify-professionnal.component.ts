import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { Professionnal } from '../../../models/professionnal.model';
import { ProfessionnalService } from '../../../services/professionnal.service';

@Component({
  selector: 'app-modify-professionnal',
  imports: [ReactiveFormsModule],
  templateUrl: './modify-professionnal.component.html',
  styleUrl: './modify-professionnal.component.css'
})
export class ModifyProfessionnalComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Input({ required: true }) pro!: Professionnal
  private fb: FormBuilder = inject(FormBuilder);
  updateForm!: FormGroup;

  private professionnalService = inject(ProfessionnalService)

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      id: new FormControl(this.pro.id, [Validators.required]),
      name: new FormControl(this.pro.name, [Validators.required]),
      siret: new FormControl(this.pro.siret, [Validators.required]),
      email: new FormControl(this.pro.email, [Validators.required]),
      password: new FormControl(this.pro.password, [Validators.required]),
      image: new FormControl(this.pro.image, [Validators.required]),
    });
  }
  onCancel() {
    this.close.emit(false);
  }
  onSubmit() {
    if (this.updateForm.invalid) {
      console.log("Formulaire invalide");
      return;
    }
    const updated = {
      id: this.updateForm.get("id")?.value,
      name: this.updateForm.get("name")?.value,
      siret: this.updateForm.get("siret")?.value,
      email: this.updateForm.get("email")?.value,
      password: this.updateForm.get("password")?.value,
      image: this.updateForm.get("image")?.value,
    };
    this.professionnalService.updatePro(updated.id, updated).then(() => {
    });
    this.close.emit(false);
    window.location.reload()
  }
}
