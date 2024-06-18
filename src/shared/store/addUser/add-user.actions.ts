import { User } from '../../types/User';

export class AddUserAction {
  static readonly type = '[AddUser] Add Item';
  constructor(public payload: User) {}
}

export class UpdateUserAction {
  static readonly type = '[User] Update Item';
  constructor(public payload: User) {}
}

export class DeleteUserAction {
  static readonly type = '[DeleteUser] Delete Item';
  constructor(public payload: User) {}
}
