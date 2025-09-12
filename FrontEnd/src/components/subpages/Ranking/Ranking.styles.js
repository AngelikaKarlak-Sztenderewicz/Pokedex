import styled from "styled-components";

export const RankingWrapper = styled.div`
  background-color: ${({ theme }) => theme.form};
  width: 50%;
  justify-self: center;
  border-radius: 12px;
  padding: 30px;
  min-width: 250px;

  ul {
    list-style: none;
    justify-self: center;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 16px;

    div {
      align-items: center;
      display: flex;
    }
  }

  img {
    width: 100px;
  }

  @media (max-width: 768px) {
    li {
      flex-direction: column;
    }
  }
`;
