import { useEffect, useState, useContext } from "react";
import usePokemons from "../../../hooks/usePokemons";
import {
  PokemonListWrapper,
  Searcher,
  ButtonDiv,
  Overlay,
} from "./PokemonList.styles";
import { ModalCard } from "../../shared/PokemonModalCardComponent/PokemonModalCardComponent.styles";
import Button from "../../shared/Button/Button";
import { LoginContext } from "../../../context/LoginContext";
import PokemonCardComponent from "../../shared/PokemonCardComponent/PokemonCardComponent";
import PokemonModalCardComponent from "../../shared/PokemonModalCardComponent/PokemonModalCardComponent";

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const {
    isLoggedIn,
    userPokemons,
    favorites,
    toggleFavorite,
    toggleArena,
    onArena,
  } = useContext(LoginContext);
  const { pokemons, loading } = usePokemons();
  const [allPokemons, setAllPokemons] = useState([]);
  const pokemonsPerPage = 15;

  useEffect(() => {
    const mergedMap = new Map();

    userPokemons.forEach((up) => {
      const baseId = String(up.id).split("_")[0];
      mergedMap.set(baseId, up);
    });

    pokemons.forEach((p) => {
      const baseId = String(p.id);
      if (!mergedMap.has(baseId)) {
        mergedMap.set(baseId, p);
      }
    });

    setAllPokemons(Array.from(mergedMap.values()));
  }, [pokemons, userPokemons]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchPokemon]);

  if (loading) return <p>Ładowanie...</p>;

  const filteredPokemons = allPokemons.filter(
    (p) => p.name && p.name.toLowerCase().includes(searchPokemon)
  );

  const lastPokemonIndex = currentPage * pokemonsPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    firstPokemonIndex,
    lastPokemonIndex
  );

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  return (
    <>
      <Searcher>
        <input
          placeholder="Search"
          value={searchPokemon}
          onChange={(e) => setSearchPokemon(e.target.value.toLowerCase())}
        />
      </Searcher>

      <PokemonListWrapper>
        {currentPokemons.length > 0 ? (
          currentPokemons.map((p) => (
            <PokemonCardComponent
              key={p.id || p.name}
              p={p}
              onSelect={setSelectedPokemon}
            />
          ))
        ) : (
          <p>Brak wyników</p>
        )}
      </PokemonListWrapper>

      {filteredPokemons.length > 0 && (
        <ButtonDiv>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </ButtonDiv>
      )}

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

export default PokemonList;
