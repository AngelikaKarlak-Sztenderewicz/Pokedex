import styled from "styled-components";

export const EditPageWrapper = styled.div`
  background-color: ${({ theme }) => theme.form};
  width: 50%;
  justify-self: center;
  border-radius: 12px;
  padding: 30px;

  ul {
    list-style: none;
  }

  li {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  img {
    width: 100px;
  }
`;

export const EditButton = styled.button`
  margin-top: 0;
  background-color: ${({ theme }) => theme.button};

  &:hover {
    background-color: #ff4444;
  }
`;

export const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Img = styled.img`
  width: ${({ $active }) => ($active ? "120px" : "80px")};
  border-radius: 50%;
  filter: ${({ $used }) => ($used ? "grayscale(100%)" : "none")};
  opacity: ${({ $used }) => ($used ? 0.5 : 1)};
  transition: 0.3s;
  cursor: ${({ $used }) => ($used ? "not-allowed" : "pointer")};
`;
