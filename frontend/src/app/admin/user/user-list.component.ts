import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

import { MatIconModule } from '@angular/material/icon';
import { NewUserComponent } from './new-user/new-user.component';
import { UserService } from '../../services/user.service';
import { ModifyUserComponent } from './modify-user/modify-user.component';

@Component({
  selector: 'app-user-list',
  imports: [MatIconModule, NewUserComponent, ModifyUserComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  listUser: User[] = [];
  isAddUser: boolean = false;
  isModifyUser: boolean = false;
  modifyUser: User = {
    id: 0,
    name: "",
    surname: "",
    email: "",
    birthday: "",
    password: "",
    isAdmin: true,
    professionnal: true
  }


  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().then((users: User[]) => {
      this.listUser = users;
    })
  }
  onAddUser() {
    this.isAddUser = true
  }
  onCloseAddUser() {
    this.isAddUser = false
  }

  modifyUserId(user: User) {
    this.isModifyUser = true;
    this.modifyUser = user;

  }

  removeId(id: number) {
    this.userService.deleteUser(id).then(() => {
      this.listUser = this.listUser.filter(user => user.id !== id);
      window.location.reload();
    });
  }

}
