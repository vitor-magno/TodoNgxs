import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AddUserAction,
  DeleteUserAction,
  UpdateUserAction,
} from '../../../shared/store/addUser/add-user.actions';
import { User } from '../../../shared/types/User';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  form!: FormGroup;
  users$!: Observable<User>;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  user = (this.users$ = this.store.select(
    (state) => state.userStateName.users
  ));

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
    });
  }

  addUser({ name, email }: User) {
    this.store.dispatch(new AddUserAction({ name, email }));
    this.form.reset();
  }

  editUser(user: User) {
    this.form.patchValue({
      name: user.name,
      email: user.email,
    });

    this.store.dispatch(new UpdateUserAction(user));
  }

  deleteUser({ name, email }: User) {
    this.store.dispatch(new DeleteUserAction({ name, email }));
    this.form.reset();
  }
}
