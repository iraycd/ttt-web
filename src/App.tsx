import * as React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
  align-items: center;
`;

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <MainContainer>
        <h1>Hello</h1>
      </MainContainer>
    );
  }
}
