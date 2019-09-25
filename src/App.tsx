import * as React from "react";
import styled from "styled-components";
import GameContainer from "./containers/Game.container";

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
        <GameContainer />
      </MainContainer>
    );
  }
}
