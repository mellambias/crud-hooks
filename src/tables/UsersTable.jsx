import React, { useState } from "react";

const UsersTable = ({
  users,
  controler: {
    edit,
    deleteUser,
    global: { isEditMode },
  },
}) => {
  // console.log("UserTable %o", users);
  const [sortby, setSortby] = useState("name");
  // const { edit, deleteUser } = controler;
  // const { isEditMode } = controler.global;
  return (
    <table>
      <thead>
        <tr>
          <th>
            <a
              id="orderbyname"
              href="#orderbyname"
              onClick={() => setSortby("name")}
            >
              Name
            </a>
          </th>
          <th>
            <a
              id="orderbyusername"
              href="#orderbyusername"
              onClick={() => setSortby("username")}
            >
              Username
            </a>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length ? (
          users
            .sort((a, b) => a[sortby].localeCompare(b[sortby]))
            .map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>
                  {/* para que no se ejecute de forma inmediata se usa la
                funcion anonima */}
                  <button
                    className="button muted-button"
                    onClick={() => edit(user)}
                  >
                    Edit-{isEditMode.toString()}
                  </button>
                  <button
                    className="button muted-button"
                    onClick={() => deleteUser(user)}
                    disabled={isEditMode === true ? "disabled" : ""}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan="3">sin usuarios</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UsersTable;
