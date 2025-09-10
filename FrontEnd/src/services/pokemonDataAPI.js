const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemons = async (limit = 150) => {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}`);
    const data = await response.json();

    const detailed = await Promise.all(
      data.results.map(async (p) => {
        const res = await fetch(p.url);
        return res.json();
      })
    );

    return detailed;
  } catch (error) {
    console.error("Błąd pobierania Pokémonów:", error);
    return [];
  }
};

export const fetchPokemonsImages = async (start = 151) => {
  try {
    const response = await fetch(`${BASE_URL}?offset=${start - 1}&limit=30`);
    const data = await response.json();

    const images = await Promise.all(
      data.results.map(async (p) => {
        const res = await fetch(p.url);
        const pokemon = await res.json();
        return {
          id: pokemon.id,
          image: pokemon.sprites.other["official-artwork"].front_default,
        };
      })
    );
    return images;
  } catch (error) {
    console.error("Error downloading Pokémon graphics", error);
    return [];
  }
};
