import { Component, inject, OnInit, DestroyRef, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Professionnal } from '../../models/professionnal.model';
import { ProfessionnalService } from '../../services/professionnal.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NewProfessionnalComponent } from "./new-professionnal/new-professionnal.component";
import { ModifyProfessionnalComponent } from "./modify-professionnal/modify-professionnal.component";


@Component({
  selector: 'app-professionnal',
  imports: [MatIconModule, NewProfessionnalComponent, ModifyProfessionnalComponent],
  templateUrl: './professionnal.component.html',
  styleUrl: './professionnal.component.css'
})
export class ProfessionnalComponent implements OnInit, OnDestroy {
  professionnalList: Professionnal[] = [];
  private professionalService = inject(ProfessionnalService)
  private router = inject(Router)
  private destroy$ = new Subject<void>();


  isAddProfessionnal: boolean = false;
  isModifyProfessionnal: boolean = false;
  modifyProfessionnal: Professionnal = {
    id: 0,
    name: "",
    siret: "",
    image: "",
    email: "",
    password: "",

  };
  currentPage: number = 1;
  totalPages: number = 1;

  ngOnInit(): void {
    this.professionalService.getAllPro().subscribe((pros: Professionnal[]) => {
      console.log('Données récupérées:', pros);
      this.professionnalList = pros;
    });
  }

  nextPage() { }

  prevPage() { }

  onClick(event: Event) { }

  getAllProfessionnal() {

  }

  modifyProfessionnalId(professionnal: Professionnal) {
    this.modifyProfessionnal = professionnal;
    this.isModifyProfessionnal = true;
  }

  deleteProfessionnal(id: number) {
    this.professionalService.deleteProfessionnal(id).subscribe(() => {
      this.professionnalList = this.professionnalList.filter(pro => pro.id !== id);
    });
  }

  onAddPro() {
    this.isAddProfessionnal = true;
  }

  onCloseAddPro() {
    this.isAddProfessionnal = false;
  }

  backToHome() {
    this.router.navigate(['/admin']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
