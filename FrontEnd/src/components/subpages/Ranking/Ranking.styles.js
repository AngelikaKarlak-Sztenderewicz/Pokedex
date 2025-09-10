import styled from "styled-components";

export const RankingWrapper = styled.div`
  background-color: ${({ theme }) => theme.form};
  width: 50%;
  justify-self: center;
  border-radius: 12px;
  padding: 30px;

  ul {
    list-style: none;
    justify-self: center;
  }

  li {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  img {
    width: 100px;
  }
`;
