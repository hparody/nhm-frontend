import { useRouteError } from "react-router-dom";
import styled from "@emotion/styled";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
`;

const NotFoundPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <ErrorContainer id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error ? error.statusText || error.message : ""}</i>
      </p>
    </ErrorContainer>
  );
};

export default NotFoundPage;
