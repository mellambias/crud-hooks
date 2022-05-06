import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
//props -> constainer -> addUser

const AddUserForm = ({ controler: { addUser } }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function submitForm(user, event) {
    event.preventDefault();
    addUser(user);
    //limpiar campos
    reset({ name: "", username: "" });
  }
  return (
    <Fragment>
      <form onSubmit={handleSubmit(submitForm)}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>Texto obligatorio</span>}

        <label>Username</label>
        <input
          type="text"
          name="username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>Texto obligatorio</span>}
        <button type="submit">Add new user</button>
      </form>
    </Fragment>
  );
};

export default AddUserForm;
