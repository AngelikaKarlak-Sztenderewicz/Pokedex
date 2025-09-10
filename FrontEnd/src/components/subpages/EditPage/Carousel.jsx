import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "../../shared/Button/Button";
import { Img, CarouselWrapper } from "./Edition.styles";

const Carousel = ({ sprites, userPokemons, current, setCurrentSprite }) => {
  const prevSprite = () => {
    setCurrentSprite((prev) => (prev === 0 ? sprites.length - 1 : prev - 1));
  };

  const nextSprite = () => {
    setCurrentSprite((prev) => (prev + 1) % sprites.length);
  };

  const indicies = [
    (current - 1 + sprites.length) % sprites.length,
    current,
    (current + 1) % sprites.length,
  ];

  return (
    <CarouselWrapper>
      <Button type="button" onClick={prevSprite}>
        <FaArrowLeft />
      </Button>

      {indicies.map((i) => {
        const isUsed = userPokemons.some(
          (p) =>
            p.sprites.other["official-artwork"].front_default === sprites[i]
        );
        return (
          <Img
            key={sprites[i]}
            src={sprites[i]}
            alt={`sprite-${i}`}
            $active={i === current}
            $used={isUsed}
          />
        );
      })}

      <Button type="button" onClick={nextSprite}>
        <FaArrowRight />
      </Button>
    </CarouselWrapper>
  );
};

export default Carousel;
