import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.headerBackground};
  color: ${({ theme }) => theme.text};
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  min-width: 280px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    width: 80%;
  }

  span {
    color: #ffffff;
    align-items: center;
    display: flex;
    gap: 5px;
    align-self: end;
  }

  button {
    width: 100%;
  }

  @media (max-width: 768px) {
    > div {
      flex-direction: column;
      width: 100%;
    }

    span {
      align-self: end;
    }
  }
`;

export const UserArea = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  justify-content: flex-end;
  width: ${({ $isLoggedIn }) => ($isLoggedIn ? "100%" : "50%")};
  align-self: end;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: ${({ theme }) => theme.switchActiveBackground};
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.switchBackground};
    transition: 0.4s;
    border-radius: 20px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: ${({ theme }) => theme.switchActiveBackground};
  }

  input:checked + span:before {
    transform: translateX(20px);
  }
`;

export const Img = styled.img`
  width: 20%;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const Form = styled.form`
  margin: 50px 0;
  background-color: ${({ theme }) => theme.form};
  width: 60%;
  justify-self: center;
  border-radius: 12px;
  padding: 30px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 16px;
    gap: 6px;
  }

  label {
    width: 100px;
    display: inline-block;
    font-size: 20px;
    text-align: end;
  }

  input {
    width: 140px;
    height: 40px;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccccccff;
    box-sizing: border-box;
  }

  p {
    color: red;
    margin: 0;
  }

  button {
    margin-top: 20px;
    width: 155px;

    @media (max-width: 1000px) {
      width: 80px;
    }
  }

  @media (max-width: 420px) {
    input {
      width: 90px;
    }

    > div {
      justify-content: space-between;
    }
  }
`;
