import React, { useState } from "react";
import UsersTable from "./tables/UsersTable";
import { v4 as uuidv4 } from "uuid";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";

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

function App() {
  let dataUsers = [];
  if (window.localStorage.getItem("dataUsers")) {
    const data = JSON.parse(window.localStorage.getItem("dataUsers"));
    data.forEach((user) => {
      dataUsers.push(new User(user.name, user.username, user.id));
    });
  } else {
    dataUsers.push(new User("Tania", "floppydiskette"));
    dataUsers.push(new User("Craig", "siliconeidolon"));
    dataUsers.push(new User("Ben", "benisphere"));
    updateStorage(dataUsers);
  }

  function updateStorage(dataUsers) {
    setUsersContainer(dataUsers);
    window.localStorage.setItem("dataUsers", JSON.stringify(dataUsers));
  }
  console.log(dataUsers);
  //Estado del componete
  const [usersContainer, setUsersContainer] = useState(dataUsers);
  const [global, setGlobal] = useState({ currentUser: {}, isEditMode: false });

  // objeto JS con los metodos CRUD y variables globales del estado
  let controler = {
    global: global,
    deleteUser: function (user) {
      //asigna a userContainer un array con los usuarios cuyo id no sea el del usuario borrado
      updateStorage(usersContainer.filter((item) => item.id !== user.id));
      // asigna a la variable global el usuario actual
      setGlobal({ ...global, currentUser: {} }); // copia el objeto actual y añade los cambios
    },
    update: function (user, userData) {
      // llama al metodo update de la clase User
      if (user.update(userData)) {
        updateStorage(
          usersContainer.map((item) => (item.id === user.id ? user : item))
        );
        setGlobal({ ...global, currentUser: {} });
      } else {
        console.error("No cumple los criterios de edicion");
      }
      setGlobal({ ...global, isEditMode: false });
    },
    edit: function (user) {
      //establece el valor del usuario actual y el modo edición en las variables globales
      setGlobal({ ...global, currentUser: user, isEditMode: true });
    },
    addUser: function (user) {
      //Crea un nuevo usuario y lo añade al userContainer
      const newUser = new User(user.name, user.username);
      //no se puede añadir al array con push. Usar sintaxis:
      updateStorage([...usersContainer, newUser]);
    },
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {controler.global.isEditMode ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm controler={controler} />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm controler={controler} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UsersTable users={usersContainer} controler={controler} />
        </div>
      </div>
    </div>
  );
}

export default App;
