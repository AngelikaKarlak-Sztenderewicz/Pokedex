import styled from "styled-components";

export const ArenaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin: 50px;
  background-color: ${({ theme }) => theme.form};
  width: 60%;
  justify-self: center;
  border-radius: 12px;
  padding: 30px;
  min-width: 220px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    margin: 50px 0;
  }
`;

export const Img = styled.img`
  height: 300px;

  @media (max-width: 768px) {
    height: auto;
    width: 100%;
  }
`;
