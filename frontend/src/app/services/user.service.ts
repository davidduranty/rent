import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {

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
}
