import { LoginContext } from "../../../context/LoginContext";
import { useContext, useState, useEffect } from "react";
import PokemonCardComponent from "../../shared/PokemonCardComponent/PokemonCardComponent";
import { ArenaWrapper, Img } from "./Arena.styles";
import Button from "../../shared/Button/Button";
import Pokedex from "../../../icons/Pokedex.png";

const Arena = () => {
  const { onArena, setOnArena, userPokemons, setUserPokemons, updatePokemon } =
    useContext(LoginContext);

  const [result, setResult] = useState(null);

  useEffect(() => {
    const validArena = onArena.filter((id) =>
      userPokemons.some((p) => p.id === id)
    );
    if (validArena.length !== onArena.length) {
      setOnArena(validArena);
      localStorage.setItem(
        `arena_${userPokemons[0]?.userId}`,
        JSON.stringify(validArena)
      );
    }
  }, [onArena, userPokemons, setOnArena]);

  const selectedPokemons = userPokemons.filter((p) => onArena.includes(p.id));

  const removeFromArena = (id) => {
    setOnArena((prev) => {
      const updated = prev.filter((pid) => pid !== id);
      localStorage.setItem(
        `arena_${userPokemons[0]?.userId}`,
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  const clearArena = () => {
    setOnArena([]);
    localStorage.setItem(
      `arena_${userPokemons[0]?.userId}`,
      JSON.stringify([])
    );
    setResult(null);
  };

  const handleFight = async () => {
    const [firstPokemon, secondPokemon] = selectedPokemons.map((p) =>
      userPokemons.find((up) => up.id === p.id)
    );

    const score1 = firstPokemon.base_experience * firstPokemon.weight;
    const score2 = secondPokemon.base_experience * secondPokemon.weight;

    let winner = null;
    let loser = null;
    let message = "";

    if (score1 > score2) {
      winner = firstPokemon;
      loser = secondPokemon;
      message = `${firstPokemon.name} wins!`;
    } else if (score2 > score1) {
      winner = secondPokemon;
      loser = firstPokemon;
      message = `${secondPokemon.name} wins`;
    } else {
      message = "It's a draw!";
    }

    if (winner && loser) {
      const winnerFromDB = await fetch(
        `http://localhost:5174/userPokemons/${winner.id}`
      ).then((r) => r.json());
      const loserFromDB = await fetch(
        `http://localhost:5174/userPokemons/${loser.id}`
      ).then((r) => r.json());
      const updateWinner = {
        ...winnerFromDB,
        base_experience: (winnerFromDB.base_experience || 0) + 10,
        win: (winnerFromDB.win || 0) + 1,
        lose: winnerFromDB.lose || 0,
      };

      const updateLoser = {
        ...loserFromDB,
        base_experience: loserFromDB.base_experience,
        win: loserFromDB.win || 0,
        lose: (loserFromDB.lose || 0) + 1,
      };

      const [savedWinner, savedLoser] = await Promise.all([
        updatePokemon(updateWinner),
        updatePokemon(updateLoser),
      ]);
      setUserPokemons((prev) =>
        prev.map((p) =>
          p.id === savedWinner.id
            ? { ...savedWinner }
            : p.id === savedLoser.id
            ? { ...savedLoser }
            : p
        )
      );
      setResult({ winnerId: savedWinner.id, loserId: savedLoser.id, message });
    } else {
      setResult({ message });
    }
  };

  return (
    <ArenaWrapper>
      {selectedPokemons[0] ? (
        <PokemonCardComponent
          key={selectedPokemons[0].id}
          p={selectedPokemons[0]}
          showTrash={true}
          removeFromArena={removeFromArena}
          faded={result?.loserId === selectedPokemons[0].id}
          winnersFrame={result?.winnerId === selectedPokemons[0].id}
        />
      ) : (
        <Img src={Pokedex} alt="pokedex" />
      )}

      {result ? (
        <div>
          <p>{result.message}</p>
          <Button onClick={clearArena}>Leave arena</Button>
        </div>
      ) : (
        <Button disabled={selectedPokemons.length < 2} onClick={handleFight}>
          WALCZ!
        </Button>
      )}

      {selectedPokemons[1] ? (
        <PokemonCardComponent
          key={selectedPokemons[1].id}
          p={selectedPokemons[1]}
          showTrash={true}
          removeFromArena={removeFromArena}
          faded={result?.loserId === selectedPokemons[1].id}
          winnersFrame={result?.winnerId === selectedPokemons[1].id}
        />
      ) : (
        <Img src={Pokedex} alt="pokedex" />
      )}
    </ArenaWrapper>
  );
};

export default Arena;
