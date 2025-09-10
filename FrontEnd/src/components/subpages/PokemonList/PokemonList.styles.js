import styled from "styled-components";

export const Searcher = styled.div`
  background-color: ${({ theme }) => theme.button};
  margin: 16px 0;

  input {
    background-color: ${({ theme }) => theme.button};
    border: 2px solid #000;
    width: 250px;
    height: 60px;
    margin: 20px;
    &::placeholder {
      color: #000;
    }
  }
`;

export const PokemonListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

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

export const ButtonDiv = styled.div`
  margin-bottom: 50px;
  gap: 10px;
  display: flex;
  justify-content: center;

  button {
    margin-top: 20px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
