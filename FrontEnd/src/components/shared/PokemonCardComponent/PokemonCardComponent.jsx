import {
  PokemonCard,
  TrashIcon,
  PointSection,
} from "./PokemonCardComponent.styles";
import { PokemonInfo } from "../Shared.styles";


const PokemonCardComponent = ({
  p,
  onSelect,
  showTrash,
  removeFromArena,
  faded,
  winnersFrame,
}) => {
  return (
    <div>
      <PokemonCard
        onClick={() => onSelect(p)}
        faded={faded}
        winnersFrame={winnersFrame}
      >
        {(p.win > 0 || p.lose > 0) && (
          <PointSection>
            <>
              W: {p.win} <br />
            </>
            <>L: {p.lose}</>
          </PointSection>
        )}

        <img
          src={p.sprites?.other["official-artwork"]?.front_default}
          alt={p.name}
        />
        {showTrash && (
          <TrashIcon
            onClick={(e) => {
              e.stopPropagation();
              removeFromArena(p.id);
            }}
          />
        )}
        <h2>{p.name}</h2>
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
            <span>{p.abilities?.[0]?.ability?.name}</span>
            <h4>ability</h4>
          </div>
        </PokemonInfo>
      </PokemonCard>
    </div>
  );
};

export default PokemonCardComponent;
