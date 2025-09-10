import { Outlet } from "react-router-dom";
import Header from "./components/subpages/Header/Header";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.pageBackground};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  padding: 20px;
`;

function App() {
  return (
    <>
      <Header />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </>
  );
}

export default App;
