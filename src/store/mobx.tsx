import { action, makeObservable, observable } from 'mobx';
export interface UserType {
  id: string;
  Email: string;
  Name: string;
}
interface UserList {
  data: UserType[];
}

const initUser: UserType = {
  id: '12345',
  Email: 'Nam@gmail.com',
  Name: 'Nam',
};

class UserInfor {
  UserList: UserList = { data: [initUser] };
  constructor() {
    makeObservable(this, {
      UserList: observable,
      addUser: action,
      deleteUser: action,
    });
  }

  addUser(user: UserType) {
    this.UserList = { ...this.UserList, data: [...this.UserList.data, user] };
  }
  deleteUser(id: string) {
    this.UserList.data = this.UserList.data.filter(user => user?.id !== id)
  }
}
export const userInfor = new UserInfor();