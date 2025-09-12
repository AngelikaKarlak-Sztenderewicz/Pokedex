import { PokemonInfo } from "../Shared.styles";
import {
  HeartIcon,
  SwordIcon,
  Icons,
  ModalContent,
} from "./PokemonModalCardComponent.styles";

const PokemonModalCardComponent = ({
  p,
  isLoggedIn,
  favorites,
  toggleFavorite,
  toggleArena,
  onArena,
}) => {
  const arenaCount = onArena.length;

  const handleArenaClick = () => {
    if (onArena.includes(p.id)) {
      toggleArena(p);
    } else if (arenaCount < 2) {
      toggleArena(p);
    } else {
      alert(
        "The arena can hold a maximum of 2 Pokémon! Remove someone to add a new one."
      );
    }
  };

  return (
    <ModalContent>
      <span>
        <h2>{p.name}</h2>
        
        {isLoggedIn && (
          <Icons>
            <span>{`Arena: ${arenaCount}/2`}</span>
            <SwordIcon
              onClick={handleArenaClick}
              $active={onArena.includes(p.id)}
            />
            <HeartIcon
              onClick={() => toggleFavorite(p)}
              $active={favorites.includes(p.id)}
            >
              ♥
            </HeartIcon>
          </Icons>
        )}
      </span>

      <PokemonInfo>
        <div className="info-item">
          <span>{p.height}</span>
          <h4>height</h4>
        </div>
        <div className="info-item">
          <span>{p.base_experience}</span>
          <h4>base experience</h4>
        </div>
        <div className="info-item">
          <span>{p.weight}</span>
          <h4>weight</h4>
        </div>
        <div className="info-item">
          <span>{p.abilities?.[0]?.ability?.name || "unknown"}</span>
          <h4>ability</h4>
        </div>
      </PokemonInfo>
    </ModalContent>
  );
};

export default PokemonModalCardComponent;
