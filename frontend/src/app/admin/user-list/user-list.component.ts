import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  imports: [MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  listUser: User[] = []

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().then((users: User[]) => {
      this.listUser = users;
    })
  }
}
