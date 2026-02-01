import { useEffect, useState } from "react";
import { fetchPokemons } from "../services/pokemonDataAPI";

export default function usePokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await fetchPokemons();
        setPokemons(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPokemons();
  }, []);
  return { pokemons, loading, setPokemons };
}
