import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../../types/User';
import {
  AddUserAction,
  DeleteUserAction,
  UpdateUserAction,
} from './add-user.actions';

export class UserStateModel {
  users!: User[];
}

@State({
  name: 'userStateName',
  defaults: {
    users: [],
  },
})
@Injectable()
export class UserState {
  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Action(AddUserAction)
  add(
    { getState, setState }: StateContext<UserStateModel>,
    { payload }: AddUserAction
  ) {
    // getState pega os valores
    // setState seta os valores
    const state = getState();
    setState({
      ...state,
      users: [...state.users, payload],
    });
  }

  @Action(UpdateUserAction)
  update(
    { getState, setState }: StateContext<UserStateModel>,
    { payload }: UpdateUserAction
  ) {
    const state = getState();
    const updatedUsers = state.users.map((u) => {
      if (u.email === payload.email) {
        return {
          ...payload,
        };
      }
      return u;
    });
    setState({
      ...state,
      users: updatedUsers,
    });
  }

  @Action(DeleteUserAction)
  delete(
    { getState, setState }: StateContext<UserStateModel>,
    { payload }: DeleteUserAction
  ) {
    const state = getState();
    const filteredUsers = state.users.filter(
      (user) => user.email !== payload.email
    );

    setState({
      ...state,
      users: filteredUsers,
    });
  }
}
