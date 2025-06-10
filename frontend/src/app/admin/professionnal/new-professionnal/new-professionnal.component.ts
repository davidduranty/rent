import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-professionnal',
  imports: [],
  templateUrl: './new-professionnal.component.html',
  styleUrl: './new-professionnal.component.css'
})
export class NewProfessionnalComponent {
  private router = inject(Router);
  onCancel() {
    this.router.navigate(['admin/professionnal']);
  }

  onSubmit() { }

}
