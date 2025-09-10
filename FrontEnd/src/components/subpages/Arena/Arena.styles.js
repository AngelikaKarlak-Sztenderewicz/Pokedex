import styled from "styled-components";

export const ArenaWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin: 50px;
  background-color: ${({ theme }) => theme.form};
  width: 60%;
  justify-self: center;
  border-radius: 12px;
  padding: 30px;
`;

export const Img = styled.img`
  height: 300px;
`;
