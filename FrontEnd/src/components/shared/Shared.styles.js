import styled from "styled-components";

export const PokemonInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 16px;

  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h4 {
    margin: 0;
  }
`;

