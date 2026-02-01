import { Overlay, PokemonListWrapper } from "../PokemonList/PokemonList.styles";
import { ModalCard } from "../../shared/PokemonModalCardComponent/PokemonModalCardComponent.styles";
import { useContext, useState } from "react";
import { LoginContext } from "../../../context/LoginContext";
import usePokemons from "../../../hooks/usePokemons";
import PokemonCardComponent from "../../shared/PokemonCardComponent/PokemonCardComponent";
import PokemonModalCardComponent from "../../shared/PokemonModalCardComponent/PokemonModalCardComponent";

const FavoritePokemon = () => {
  const {
    favorites,
    toggleFavorite,
    isLoggedIn,
    userPokemons,
    toggleArena,
    onArena,
  } = useContext(LoginContext);
  const { pokemons, loading } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  if (loading) return <p>Ładowanie...</p>;

  const updatedApiPokemons = pokemons.map((p) => {
    const local = userPokemons.find((up) => up.id === p.id);
    return local || p;
  });
  const customPokemons = userPokemons.filter(
    (up) => !pokemons.some((p) => p.id === up.id)
  );
  const allPokemons = [...updatedApiPokemons, ...customPokemons];
  const favoritePokemons = allPokemons.filter((p) => favorites.includes(p.id));

  return (
    <>
      <h1>Favorite Pokémons:</h1>

      <PokemonListWrapper>
        {favoritePokemons.length > 0 ? (
          favoritePokemons.map((p) => (
            <PokemonCardComponent
              key={p.id || p.name}
              p={p}
              onSelect={setSelectedPokemon}
            />
          ))
        ) : (
          <p>
            No favorite Pokémon. Click the heart on the Pokémon card details on
            the home page to add the Pokémon to your favorites!
          </p>
        )}
      </PokemonListWrapper>

      {selectedPokemon && (
        <Overlay onClick={() => setSelectedPokemon(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <img
              src={
                selectedPokemon.sprites?.other["official-artwork"]
                  ?.front_default
              }
              alt={selectedPokemon.name}
            />
            <PokemonModalCardComponent
              p={selectedPokemon}
              isLoggedIn={isLoggedIn}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              toggleArena={toggleArena}
              onArena={onArena}
            />
          </ModalCard>
        </Overlay>
      )}
    </>
  );
};

export default FavoritePokemon;
