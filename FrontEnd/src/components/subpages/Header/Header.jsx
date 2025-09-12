import PokemonLogo from "../../../icons/PokemonLogo.png";
import Button from "../../shared/Button/Button";
import { Img, Container, Switch, UserArea } from "./Header.styles";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { useSnackbar } from "notistack";
import { FaUser } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const { isDark, toggleTheme } = useTheme();

  return (
    <Container>
      <Img src={PokemonLogo} alt="Logo" onClick={() => navigate("/")} />

      <div>
        <span>
          <FaUser />
          {user?.username}
          <Switch>
            <input type="checkbox" checked={isDark} onChange={toggleTheme} />
            <span />
          </Switch>
        </span>
        <UserArea $isLoggedIn={isLoggedIn}>
          {isLoggedIn && (
            <>
              <Button onClick={() => navigate("/favorite")}>Favorite</Button>
              <Button onClick={() => navigate("/arena")}>Arena</Button>
              <Button onClick={() => navigate("/ranking")}>Ranking</Button>
              <Button onClick={() => navigate("/edition")}>Edition</Button>
              <Button
                type="button"
                onClick={() => {
                  logout();
                  enqueueSnackbar("User has been logged out", {
                    variant: "info",
                  });
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Button onClick={() => navigate("/login")}>log in</Button>
              <Button onClick={() => navigate("/registration")}>
                registration
              </Button>
            </>
          )}
        </UserArea>
      </div>
    </Container>
  );
};

export default Header;
