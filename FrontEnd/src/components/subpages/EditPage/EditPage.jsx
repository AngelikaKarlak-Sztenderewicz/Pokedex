import Button from "../../shared/Button/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EditPageWrapper, EditButton } from "./Edition.styles";
import { LoginContext } from "../../../context/LoginContext";
import usePokemons from "../../../hooks/usePokemons";

const EditPage = () => {
  const navigate = useNavigate();
  const { pokemons, loading } = usePokemons();
  const { userPokemons, getPokemonIdForUser } = useContext(LoginContext);

  if (loading) return <p>Loading...</p>;

  const allPokemonsMap = new Map();
  pokemons.forEach((p) => allPokemonsMap.set(p.id.toString(), p));
  userPokemons.forEach((p) => {
    const id = getPokemonIdForUser(p, { id: p.userId });
    allPokemonsMap.set(id, p);
  });

  const allPokemons = Array.from(allPokemonsMap.values()).filter((p) => {
    if (!p.id.toString().includes("_")) {
      const existsInDB = userPokemons.some(
        (up) => up.id.split("_")[0] === p.id.toString()
      );
      return !existsInDB;
    }
    return true;
  });

  return (
    <>
      <EditPageWrapper>
        <Button onClick={() => navigate("create")}>Create Pokémon</Button>

        <h2>Pokémon List:</h2>

        <ul>
          {allPokemons.map((p, index) => (
            <li key={p.id || index}>
              {index + 1}. {p.name}
              <img
                src={
                  p.sprite ||
                  p.sprites?.other["official-artwork"]?.front_default
                }
                alt={p.name}
              />
              <EditButton
                onClick={() =>
                  navigate("/edition/edit_form/:id", { state: { p } })
                }
              >
                Edytuj
              </EditButton>
            </li>
          ))}
        </ul>
      </EditPageWrapper>
    </>
  );
};

export default EditPage;
