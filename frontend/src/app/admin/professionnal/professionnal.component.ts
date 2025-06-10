import { Component, inject, OnInit, DestroyRef, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Professionnal } from '../../models/professionnal.model';
import { ProfessionnalService } from '../../services/professionnal.service';
import { Router } from '@angular/router';
import { ProDto } from '../../../../../backend/dist/src/models/professionnal.model';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-professionnal',
  imports: [MatIconModule],
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

  modifyProfessionnalId(professionnal: Professionnal) { }

  deleteProfessionnal(id: number) {
    this.professionalService.deleteProfessionnal(id).subscribe(() => {
      this.professionnalList = this.professionnalList.filter(pro => pro.id !== id);
    });
  }

  onAddPro() {
    this.router.navigate(['/admin/new-professionnal']);
  }

  backToHome() {
    this.router.navigate(['/admin']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
