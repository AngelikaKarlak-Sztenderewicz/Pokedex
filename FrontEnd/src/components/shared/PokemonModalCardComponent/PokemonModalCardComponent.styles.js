import styled from "styled-components";
import { GiBroadsword } from "react-icons/gi";

export const Icons = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  gap: 10px;
  display: flex;
  align-items: center;
`;

export const HeartIcon = styled.span`
  font-size: 36px;
  cursor: pointer;
  color: ${(props) => (props.$active ? "red" : "gray")};
  transition: color 0.3s;
`;

export const SwordIcon = styled(GiBroadsword)`
  font-size: 26px;
  color: ${(props) => (props.$active ? "gold" : "brown")};
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.$active ? "darkgoldenrod" : "gold")};
  }
`;

export const ModalCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.3s;
  padding: 20px;
  max-width: 600px;
  display: flex;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  animation: scaleIn 0.3s ease;

  @keyframes scaleIn {
    from {
      transform: scale(0.7);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  img {
    height: 250px;
    width: auto;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    height: 80%;
    width: 60%;
    min-width: 300px;
    flex-direction: column;
    padding: 20px 0;

    img {
      height: 50%;
    }
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
`;
