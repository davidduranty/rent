import { inject, Injectable } from '@angular/core';
import { Professionnal } from '../models/professionnal.model';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessionnalService {
  public professionnals: Professionnal[] = [];
  private readonly apiUrl = 'http://localhost:3000/professionnal';
  private http = inject(HttpClient)

  // async getAllPros(): Promise<Professionnal[]> {
  //   try {
  //     const response = await fetch('http://localhost:3000/professionnal/all');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch professionnal');
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     return [];
  //   }
  // }

  async addProfessionnal(professionnal: Professionnal): Promise<Professionnal | null> {
    try {
      const response = await fetch('http://localhost:3000/professionnal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(professionnal)
      });

      if (!response.ok) {
        throw new Error('Failed to add professionnal');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding professionnal:', error);
      return null;
    }
  }
  // public addPro(professionnal: Professionnal): Observable<Professionnal> {
  //   return this.http.post<Professionnal>(this.apiUrl, professionnal);
  // }

  public getAllPro(): Observable<Professionnal[]> {
    return this.http.get<Professionnal[]>(`${this.apiUrl}/all`).pipe(
      catchError(() => {
        console.error('Erreur lors de la récupération des professionnels');
        return new Observable<Professionnal[]>(); // Retourne un Observable vide en cas d'erreur
      })
    );
  }

  async addPro(professionnal: Professionnal): Promise<Professionnal | null> {
    try {
      const response = await fetch('http://localhost:3000/professionnal/add-professionnal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(professionnal)
      });

      if (!response.ok) {
        throw new Error('Échec de l\'ajout du professionnel');
      }

      const newPro = await response.json();
      this.professionnals.push(newPro);
      console.log(newPro)
      return newPro;
    } catch (error) {
      console.error("Erreur lors de l'ajout du professionnel :", error);
      return null;
    }
  }

  async updatePro(id: number, pro: Professionnal): Promise<Professionnal> {
    try {
      const response = await fetch(`http://localhost:3000/professionnal/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pro)
      });
      if (!response.ok) {
        throw new Error('Failed to fetch professionnal');
      }
      return await response.json();
    } catch (error) {
      return {} as Professionnal;
    }
  }

  public deleteProfessionnal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression du professionnel:', error);
        throw error; // Propagation de l'erreur
      })
    );
  }

}
