import { RankingWrapper } from "./Ranking.styles";
import { LoginContext } from "../../../context/LoginContext";
import usePokemons from "../../../hooks/usePokemons";
import { useContext, useState } from "react";

const Ranking = () => {
  const [sortBy, setSortBy] = useState("base_experience");

  const { pokemons, loading } = usePokemons();
  const { userPokemons, getPokemonIdForUser } = useContext(LoginContext);

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

  if (loading) return <p>Loading...</p>;

  const sortedPokemons = [...allPokemons].sort((a, b) => {
    if (sortBy === "fights_won") {
      return (b.fights_won || 0) - (a.fights_won || 0);
    }
    return (b[sortBy] || 0) - (a[sortBy] || 0);
  });

  return (
    <>
      <RankingWrapper>
        <h1>Ranking</h1>

        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="base_experience">Experience</option>
          <option value="weight">Weight</option>
          <option value="height">Height</option>
          <option value="win">Fights won</option>
        </select>

        <ul>
          {sortedPokemons.map((p, index) => (
            <li key={p.id || index}>
              <img
                src={
                  p.sprite ||
                  p.sprites?.other["official-artwork"]?.front_default
                }
                alt={p.name}
              />
              {index + 1}. {p.name}
              <div>
                Height: {p.height}, Weight: {p.weight}, Experience:
                {p.base_experience}, Fight won: {p.win || 0}
              </div>
            </li>
          ))}
        </ul>
      </RankingWrapper>
    </>
  );
};

export default Ranking;
