import { LoginContext } from "../../../context/LoginContext";
import Button from "../../shared/Button/Button";
import { useState, useContext } from "react";
import { Form } from "./Header.styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      enqueueSnackbar("Enter username and password", { variant: "warning" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5174/users");
      const data = await response.json();

      const foundUser = data.find(
        (u) => u.username === username && u.password === password
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
    <Form onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
