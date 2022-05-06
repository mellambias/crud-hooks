import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

//props->container->update y de props->container->globlal->currentUser
const EditUserForm = ({
  controler: {
    update,
    global: { currentUser },
  },
}) => {
  const user = currentUser;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: user,
  });
  //Actualiza los valores del formulario
  setValue("name", user.name);
  setValue("username", user.username);

  function submitForm(data, event) {
    update(user, data);
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
        <button type="submit">Edit user</button>
      </form>
    </Fragment>
  );
};

export default EditUserForm;
