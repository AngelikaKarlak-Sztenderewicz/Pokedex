import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../../shared/Button/Button";
import { Form } from "./Header.styles";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { useNavigate } from "react-router-dom";

const checkUserExists = async (username) => {
  const url = `http://localhost:5174/users?username=${encodeURIComponent(
    username
  )}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.length > 0;
};

const registrationSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .nonempty("Username is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Registration = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    const userExists = await checkUserExists(data.username);

    if (userExists) {
      enqueueSnackbar("User already exists!", { variant: "error" });
      return;
    }

    const res = await fetch("http://localhost:5174/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: String(Date.now()),
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });
    const newUser = await res.json();
    localStorage.setItem("user", JSON.stringify(newUser));
    login(newUser);
    enqueueSnackbar("Registration successful!", { variant: "success" });
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username: </label> <input {...register("username")} />
      </div>
      <span>{errors.username && <p>{errors.username.message}</p>}</span>
      <div>
        <label>Email: </label>
        <input type="email" {...register("email")} />
      </div>
      <span> {errors.email && <p>{errors.email.message}</p>}</span>
      <div>
        <label>Password: </label>
        <input type="password" {...register("password")} />
      </div>
      <span> {errors.password && <p>{errors.password.message}</p>}</span>
      <div>
        <label>Comfir password:</label>
        <input type="password" {...register("confirmPassword")} />
      </div>
      <span>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </span>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default Registration;
