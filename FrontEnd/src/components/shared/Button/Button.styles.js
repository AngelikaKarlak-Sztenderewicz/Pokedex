import styled from "styled-components";

export const ButtonStyle = styled.button`
  background-color: ${({ theme, disabled }) =>
    disabled ? "#ccc" : theme.button};
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 155px;
  height: 40px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? "#ccc" : theme.buttonHover || "#ff4444"};
  }
`;
