import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import App from "./App.jsx";
import PokemonList from "./components/subpages/PokemonList/PokemonList.jsx";
import FavoritePokemon from "./components/subpages/FavoritePokemon/FavoritePokemon.jsx";
import Arena from "./components/subpages/Arena/Arena.jsx";
import Ranking from "./components/subpages/Ranking/Ranking.jsx";
import EditPage from "./components/subpages/EditPage/EditPage.jsx";
import NotFound from "./components/subpages/NotFound/Notfound.jsx";
import LoginForm from "./components/subpages/Header/LoginForm.jsx";
import Registration from "./components/subpages/Header/Registration.jsx";
import CreatePokemon from "./components/subpages/EditPage/CreatePokemon.jsx";
import { LoginProvider, LoginContext } from "./context/LoginContext.jsx";
import { SnackbarProvider } from "notistack";
import EditForm from "./components/subpages/EditPage/EditForm.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useContext } from "react";
import { GlobalStyles } from "./GlobalStyles.js";

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useContext(LoginContext);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

const PublicOnly = ({ children }) => {
  const { isLoggedIn } = useContext(LoginContext);
  if (isLoggedIn) return <Navigate to="/" replace />;
  return children;
};

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      { element: <PokemonList />, index: true },
      {
        element: (
          <PublicOnly>
            <LoginForm />
          </PublicOnly>
        ),
        path: "login",
      },
      {
        element: (
          <PublicOnly>
            <Registration />
          </PublicOnly>
        ),
        path: "registration",
      },

      {
        element: (
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        ),
        children: [
          { element: <FavoritePokemon />, path: "favorite" },
          { element: <Arena />, path: "arena" },
          { element: <Ranking />, path: "ranking" },
          { element: <EditPage />, path: "edition" },
          { element: <CreatePokemon />, path: "edition/create" },
          { element: <EditForm />, path: "edition/edit_form/:id" },
        ],
      },
      { element: <NotFound />, path: "*" },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <GlobalStyles />
    <SnackbarProvider>
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
    </SnackbarProvider>
  </ThemeProvider>
);
