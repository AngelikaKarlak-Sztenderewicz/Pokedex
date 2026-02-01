import Button from "../../shared/Button/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>404: Not Found</h1>
      <Button onClick={() => navigate("/")}>Main Page</Button>
    </>
  );
};

export default NotFound;
