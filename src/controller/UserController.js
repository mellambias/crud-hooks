import React, { useState } from "react";
import UsersTable from "../views/UsersTable";
import AddUserForm from "../views/AddUserForm";
import EditUserForm from "../views/EditUserForm";
import User from "../model/User";

function UserController() {
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
    window.localStorage.setItem("dataUsers", JSON.stringify(dataUsers));
  }

  //Estado del componete
  const [usersContainer, setUsersContainer] = useState(dataUsers);
  const [global, setGlobal] = useState({ currentUser: {}, isEditMode: false });

  // objeto JS con los metodos CRUD y variables globales del estado
  let controler = {
    global: global,
    updateStorage: async (dataUsers) => {
      try {
        await setUsersContainer(dataUsers);
        await window.localStorage.setItem(
          "dataUsers",
          JSON.stringify(dataUsers)
        );
      } catch (error) {
        console.error(error);
      }
    },
    updateGlobal: (variables) => {
      setGlobal({ ...global, ...variables });
    },
    deleteUser: (user) => {
      //asigna a userContainer un array con los usuarios cuyo id no sea el del usuario borrado
      controler.updateStorage(
        usersContainer.filter((item) => item.id !== user.id)
      );
      controler.updateGlobal({ currentUser: {} });
    },
    update: (user, userData) => {
      // llama al metodo update de la clase User
      if (user.update(userData)) {
        controler.updateStorage(
          usersContainer.map((item) => (item.id === user.id ? user : item))
        );
        controler.updateGlobal({ currentUser: {} });
      } else {
        console.error("No cumple los criterios de edicion");
      }
      controler.updateGlobal({ isEditMode: false });
    },
    edit: (user) => {
      //establece el valor del usuario actual y el modo edición en las variables globales
      controler.updateGlobal({ currentUser: user, isEditMode: true });
    },
    addUser: (user) => {
      //Crea un nuevo usuario y lo añade al userContainer
      const newUser = new User(user.name, user.username);
      //no se puede añadir al array con push. Usar sintaxis:
      controler.updateStorage([...usersContainer, newUser]);
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

export default UserController;
