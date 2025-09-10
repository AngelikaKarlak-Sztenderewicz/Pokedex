import { Form } from "../Header/Header.styles";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../context/LoginContext";
import Button from "../../shared/Button/Button";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { fetchPokemonsImages } from "../../../services/pokemonDataAPI";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Carousel from "./Carousel";

const CreatePokemonSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  weight: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Weight must be greater than 0",
    }),
  height: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Height must be greater than 0",
    }),
  base_experience: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Experience must be at least 0",
    }),
});

const CreatePokemon = () => {
  const { user, addPokemon, userPokemons } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreatePokemonSchema),
  });
  const [sprites, setSprites] = useState([]);
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);

  const onSelectSprite = (index) => {
    setCurrentSpriteIndex(index);
  };

  useEffect(() => {
    const loadSprites = async () => {
      const data = await fetchPokemonsImages(151, 1200);
      setSprites(data.map((p) => p.image));
    };
    loadSprites();
  }, []);

  const onSubmit = async (data) => {
    const chosenSprite = sprites[currentSpriteIndex];

    const isUsed = userPokemons.some(
      (p) =>
        p.sprites?.other?.["official-artwork"]?.front_default === chosenSprite
    );

    if (!chosenSprite) {
      enqueueSnackbar("Choose a sprite", { variant: "warning" });
      return;
    }

    if (isUsed) {
      enqueueSnackbar("This sprite is already used! Choose another one.", {
        variant: "error",
      });
      return;
    }

    const newPokemon = {
      ...data,
      id: Date.now().toString(16),
      userId: user.id,
      base_experience: data.base_experience,
      sprites: {
        other: {
          "official-artwork": {
            front_default: chosenSprite,
          },
        },
      },
      abilities: [{ ability: { name: "unknown" } }],
    };

    await addPokemon(newPokemon);

    enqueueSnackbar(`New pokemon ${data.name} has been added!`, {
      variant: "success",
    });

    reset();
    setCurrentSpriteIndex(0);
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register("name", { required: true })} />
      </div>
      <span>{errors.name && <p>{errors.name.message}</p>}</span>

      <div>
        <label>Weight:</label>
        <input type="number" {...register("weight")} />
      </div>
      <span>{errors.weight && <p>{errors.weight.message}</p>}</span>
      <div>
        <label>Height:</label>
        <input type="number" {...register("height")} />
      </div>
      <span>{errors.height && <p>{errors.height.message}</p>}</span>
      <div>
        <label>Base experience:</label>
        <input type="number" {...register("base_experience")} />
      </div>
      <span>
        {errors.base_experience && <p>{errors.base_experience.message}</p>}
      </span>

      <div>
        {sprites.length > 0 && (
          <>
            <Carousel
              sprites={sprites}
              userPokemons={userPokemons}
              current={currentSpriteIndex}
              setCurrentSprite={setCurrentSpriteIndex}
              onSelectSprite={onSelectSprite}
            />
          </>
        )}
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CreatePokemon;
