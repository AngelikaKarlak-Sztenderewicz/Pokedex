import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

export const PokemonCard = styled.div`
  opacity: ${({ faded }) => (faded ? 0.5 : 1)};
  border: ${({ winnersFrame }) =>
    winnersFrame ? "5px solid #FFD700" : "none"};
  position: relative;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 14px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.3s;
  height: 400px;
  min-width: 245px;

  &:hover {
    transform: scale(1.05);
  }
  flex: 0 1 calc(20% - 14px);
  box-sizing: border-box;

  img {
    height: 150px;
  }
`;

export const PointSection = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.pointSection};
  padding: 6px;
  border-radius: 12px;
`;

export const TrashIcon = styled(FaTrash)`
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 36px;
  cursor: pointer;
  color: black;
  width: 20px;
  height: 20px;
  transition: color 0.3s;
`;
