import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userPokemons, setUserPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [onArena, setOnArena] = useState([]);

  const getPokemonIdForUser = (pokemon, user) => {
    if (String(pokemon.id).includes(`_${user.id}`)) return pokemon.id;
    return `${pokemon.id}_${user.id}`;
  };

  const getPokemonBase = (pokemon, user, exists) => {
    const baseId = getPokemonIdForUser(exists || pokemon, user);

    return {
      id: baseId,
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      base_experience: pokemon.base_experience ?? exists?.base_experience ?? 0,
      win: pokemon.win ?? exists?.win ?? 0,
      lose: pokemon.lose ?? exists?.lose ?? 0,
      userId: user.id,
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              exists?.sprites?.other?.["official-artwork"]?.front_default ||
              pokemon.sprites?.other?.["official-artwork"]?.front_default,
          },
        },
      },
      abilities: exists?.abilities
        ? [exists.abilities[0]]
        : pokemon.abilities
        ? [pokemon.abilities[0]]
        : [],
    };
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5174/userPokemons?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.map((p) => ({
            ...p,
            id: getPokemonIdForUser(p, { id: user.id }),
            win: p.win || 0,
            lose: p.lose || 0,
          }));
          setUserPokemons(formatted);
        });
    }
  }, [user]);

  useEffect(() => {
    if (isLoggedIn && user) {
      const storedFavs = localStorage.getItem(`favorites_${user.id}`);
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      const storedArena = localStorage.getItem(`arena_${user.id}`);
      if (storedArena) {
        const arenaIds = JSON.parse(storedArena);
        const validArena = arenaIds.filter((id) =>
          userPokemons.some((p) => p.id === id)
        );
        setOnArena(validArena);
        localStorage.setItem(`arena_${user.id}`, JSON.stringify(validArena));
      } else setOnArena([]);
    }
  }, [isLoggedIn, user]);

  const toggleFavorite = async (pokemon) => {
    const pokemonId = getPokemonIdForUser(pokemon, user);
    let exists = userPokemons.find((p) => p.id === pokemonId);

    if (!exists) {
      const pokemonBase = getPokemonBase(pokemon, user, null);
      const res = await fetch("http://localhost:5174/userPokemons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemonBase),
      });
      const saved = await res.json();
      setUserPokemons((prev) => [...prev, saved]);
      exists = saved;
    }

    const updatedFavs = favorites.includes(exists.id)
      ? favorites.filter((id) => id !== exists.id)
      : [...favorites, exists.id];

    setFavorites(updatedFavs);
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updatedFavs));
  };

  const toggleArena = async (pokemon) => {
    const pokemonId = getPokemonIdForUser(pokemon, user);
    let exists = userPokemons.find((p) => p.id === pokemonId);

    let savedPokemon = exists;

    if (!exists) {
      const pokemonBase = getPokemonBase(pokemon, user, null);
      const res = await fetch("http://localhost:5174/userPokemons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemonBase),
      });
      savedPokemon = await res.json();
      setUserPokemons((prev) => [...prev, savedPokemon]);
    }

    setOnArena((prev) => {
      let updatedArena;
      if (prev.includes(savedPokemon.id)) {
        updatedArena = prev.filter((id) => id !== savedPokemon.id);
      } else if (prev.length < 2) {
        updatedArena = [...prev, savedPokemon.id];
      } else {
        updatedArena = prev;
      }
      localStorage.setItem(`arena_${user.id}`, JSON.stringify(updatedArena));
      return updatedArena;
    });
  };

  const addPokemon = async (newPokemon) => {
    const pokemonId = String(newPokemon.id);
    const exists = userPokemons.find(
      (p) => String(p.id).split("_")[0] === String(pokemonId).split("_")[0]
    );

    if (exists) return exists;
    const pokemonBase = getPokemonBase(newPokemon, user, exists);
    const res = await fetch("http://localhost:5174/userPokemons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemonBase),
    });
    const saved = await res.json();
    setUserPokemons((prev) => [...prev, saved]);
    return saved;
  };

  const updatePokemon = async (updatedPokemon) => {
    const pokemonId = getPokemonIdForUser(updatedPokemon, user);
    const exists = userPokemons.find((p) => p.id === pokemonId);
    const pokemonBase = getPokemonBase(updatedPokemon, user, exists);

    if (!exists) {
      const res = await fetch("http://localhost:5174/userPokemons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemonBase),
      });
      const saved = await res.json();
      setUserPokemons((prev) => [...prev, saved]);
      return saved;
    } else {
      const res = await fetch(
        `http://localhost:5174/userPokemons/${exists.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokemonBase),
        }
      );
      const saved = await res.json();
      setUserPokemons((prev) =>
        prev.map((p) => (p.id === saved.id ? saved : p))
      );
      return saved;
    }
  };

  const login = (userObj) => {
    setUser(userObj);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        user,
        userPokemons,
        setUserPokemons,
        addPokemon,
        login,
        logout,
        favorites,
        toggleFavorite,
        onArena,
        setOnArena,
        toggleArena,
        setUser,
        updatePokemon,
        getPokemonIdForUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};