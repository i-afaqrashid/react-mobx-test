import { observable, action, makeObservable } from 'mobx';
import { User } from '../@types/global.types';
export class UserStore {
  @observable public users: User[];

  constructor() {
    makeObservable(this);
    this.users = [];
  }

  @action.bound setUsers(usersList: User[]) {
    this.users = usersList;
  }

  @action.bound updateUser(user: User) {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
  }
}
