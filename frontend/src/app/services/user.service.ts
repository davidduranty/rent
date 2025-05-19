import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public user: User[] = [];
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch('http://localhost:3000/user/all');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return [];
    }
  }

  async addUser(useradd: User): Promise<User | null> {
    try {
      const response = await fetch('http://localhost:3000/user/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(useradd)
      });

      if (!response.ok) {
        throw new Error('Échec de l\'ajout de l\'utilisateur');
      }

      const newUser = await response.json();
      this.user.push(newUser);
      return newUser;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      return null;
    }
  }

  async deleteUser(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return {} as User;
    }
  }
}
