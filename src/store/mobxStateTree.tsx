import { types, destroy } from 'mobx-state-tree'
interface UserType {
  id: string;
  Email: string;
  Name: string;
}

const initUser = {
  id: '12345',
  Email: 'Nam@gmail.com',
  Name: 'Tô',
};

const User = types.model('User', {
  id: types.string,
  Email: types.string,
  Name: types.string,
})
const UserStore = types.model('UserList', {
  UserList: types.array(User)
})
  .actions(self => ({
    addUser(User: UserType) {
      self.UserList.push(User)
    },
    removeUser(User: UserType) {
      destroy(User)
    }
  }))
  .create({
    UserList: [initUser]
  })

export default UserStore