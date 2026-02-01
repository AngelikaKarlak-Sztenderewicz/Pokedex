import { LoginContext } from "../../../context/LoginContext";
import Button from "../../shared/Button/Button";
import { useContext } from "react";
import { Form } from "./Header.styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(8, "Password is required"),
});

const LoginForm = () => {
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5174/users");
      const users = await response.json();

      const foundUser = users.find(
        (u) => u.username === data.username && u.password === data.password
      );

      if (foundUser) {
        login(foundUser);
        enqueueSnackbar("Login successful", { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar("Incorrect login details", { variant: "error" });
      }
    } catch {
      enqueueSnackbar("Failed to connect to server", { variant: "error" });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username: </label>
        <input type="text" {...register("username")} />
      </div>
      <span>{errors.username && <p>{errors.username.message}</p>}</span>
      <div>
        <label>Password: </label>
        <input type="password" {...register("password")} />
      </div>
      <span>{errors.password && <p>{errors.password.message}</p>}</span>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
};

export default LoginForm;
