import { useContext, useEffect } from "react";
import { Form } from "../Header/Header.styles";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../../context/LoginContext";
import { useSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../shared/Button/Button";

const EditForm = () => {
  const location = useLocation();
  const { p } = location.state;
  const { updatePokemon, userPokemons, user } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const userPokemon = userPokemons?.find((up) => up.id === p.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userPokemon?.name || p.name,
      weight: userPokemon?.weight || p.weight,
      height: userPokemon?.height || p.height,
      base_experience: userPokemon?.base_experience || p.base_experience,
    },
  });

  useEffect(() => {
    if (userPokemon) {
      reset({
        name: userPokemon.name,
        weight: userPokemon.weight,
        height: userPokemon.height,
        base_experience: userPokemon.base_experience,
      });
    }
  }, [userPokemon, reset]);

  const onSubmit = async (data) => {
    const currentPokemon = userPokemon || p;
    
    const updatedPokemon = {
      ...currentPokemon,
      userId: user.id,
      weight: data.weight,
      height: data.height,
      base_experience: data.base_experience,
    };

    await updatePokemon(updatedPokemon);

    enqueueSnackbar(`Pokemon ${p.name} attributes changed`, {
      variant: "info",
    });
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Weight:</label>
        <input
          type="number"
          {...register("weight", { valueAsNumber: true, min: 1 })}
        />
      </div>
      {errors.weight && <p>Weight must be greater than 0</p>}
      <div>
        <label>Height:</label>
        <input
          type="number"
          {...register("height", { valueAsNumber: true, min: 1 })}
        />
      </div>
      {errors.height && <p>Height must be greater than 0</p>}
      <div>
        <label>Base experience:</label>
        <input
          type="number"
          {...register("base_experience", { valueAsNumber: true })}
        />
      </div>

      <Button type="submit">Save</Button>
    </Form>
  );
};

export default EditForm;
