import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "../features/user/UserApi";
import { UserSchema, type UserFormData } from "./Validation/userScheme";
import { UseAppDispatch, UseAppSelector } from "../hooks";

const UserForm = () => {
  const dispatch = UseAppDispatch();

  const { loading, error } = UseAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const onsubmit = (data: UserFormData) => {
    dispatch(createUser(data));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="w-full flex flex-col items-center h-screen"
    >
      <input {...register("name")} placeholder="Enter the name" />
      <p>{errors.name?.message}</p>
      <input {...register("email")} placeholder="Enter the email" />
      <p>{errors.email?.message}</p>

      <input {...register("password")} placeholder="Enter the password" />
      <p>{errors.password?.message}</p>

      <select {...register("gender")} className="w-48.75">
        <option>Select gender</option>
        <option value={"male"}>Male</option>
        <option value={"female"}>Female</option>
        <option value={"other"}>others</option>
      </select>
      <p>{errors.gender?.message}</p>

      <textarea
        {...register("address")}
        placeholder="Enter the Address"
        className="w-48.75 border my-2.5"
      />
      <p>{errors.address?.message}</p>

      <label>
        <input {...register("isActive")} type="checkbox" /> Active
      </label>
      <p>{errors.isActive?.message}</p>

      <button
        type="submit"
        disabled={loading}
        className="w-48.75 bg-green-500 p-1 rounded-md text-white cursor-pointer my-2"
      >
        {loading ? "Submiting..." : "update"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
};

export default UserForm;
