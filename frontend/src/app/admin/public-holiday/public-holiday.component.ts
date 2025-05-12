import { Component, inject, Inject, input, InputSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { PublicHolidayService } from '../../services/public-holiday.service';
import { PublicHoliday } from '../../models/location.model';

@Component({
  selector: 'app-public-holiday',
  imports: [],
  templateUrl: './public-holiday.component.html',
  styleUrl: './public-holiday.component.css'
})
export class PublicHolidayComponent implements OnInit {
  public close: OutputEmitterRef<boolean> = output<boolean>();
  private publicHolidayService = inject(PublicHolidayService);
  public holidays!: PublicHoliday;
  public id: InputSignal<number> = input.required<number>();



  ngOnInit(): void {
    this.onDisplayPublicHoliday(this.id())
  }
  onDisplayPublicHoliday(id: number) {
    this.publicHolidayService.getById(id).then((holiday) => {
      if (holiday) {
        console.log("Jour férié récupéré :", holiday);
        this.holidays = holiday;
        // Ajoute ici la logique pour afficher l'information dans l'UI
      } else {
        console.warn("Aucun jour férié trouvé pour l'ID :", id);
      }
    }).catch(error => {
      console.error("Erreur lors de l'affichage des jours fériés :", error);
    });
  }

  onCancel() {
    this.close.emit(false);
  }
}
