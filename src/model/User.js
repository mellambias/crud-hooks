import { v4 as uuidv4 } from "uuid";

class User {
  constructor(name, username, id = false) {
    this.id = id ? id : uuidv4();
    this.name = name;
    this.username = username;
  }
  // editar usuario
  update(user) {
    this.name = user.name;
    this.username = user.username;
    return true;
  }
}

export default User;
