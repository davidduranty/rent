import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-modify-user',
  imports: [ReactiveFormsModule],
  templateUrl: './modify-user.component.html',
  styleUrl: './modify-user.component.css'
})
export class ModifyUserComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Input({ required: true }) user!: User

  private userService = inject(UserService)

  private fb: FormBuilder = inject(FormBuilder);
  updateForm!: FormGroup;

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      id: new FormControl(this.user.id, [Validators.required]),
      name: new FormControl(this.user.name, [Validators.required]),
      surname: new FormControl(this.user.surname, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
      birthday: new FormControl(this.user.birthday, [Validators.required]),
      isAdmin: new FormControl(this.user.isAdmin, [Validators.required]),
      professionnal: new FormControl(this.user.professionnal, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      console.log("Formulaire invalide");
      return;
    }
    const updated = {
      id: this.updateForm.get("id")?.value,
      name: this.updateForm.get("name")?.value,
      surname: this.updateForm.get("surname")?.value,
      email: this.updateForm.get("email")?.value,
      password: this.updateForm.get("password")?.value,
      birthday: this.updateForm.get("birthday")?.value,
      isAdmin: this.updateForm.get("isAdmin")?.value,
      professionnal: this.updateForm.get("professionnal")?.value,
    };
    this.userService.updateUser(updated.id, updated).then(() => {
    });
    this.close.emit(false);
    window.location.reload();


  }

  onCancel() {
    this.close.emit(false);
  }
}
