import { ButtonStyle } from "./Button.styles";

const Button = ({ children, ...rest }) => {
  return <ButtonStyle {...rest}>{children}</ButtonStyle>;
};

export default Button;
