import { SFC } from "react";
import * as React from "react";
import { Gamer } from "../modules/game/types";

interface GamerProfileProps {
  gamer: Gamer;
  gameOver: boolean;
}

export const GamerProfile: SFC<GamerProfileProps> = props => (
  <div>
    <h3>
      {props.gameOver && "Game Over!"}
      {!props.gameOver && `Player: ${props.gamer}`}
    </h3>
  </div>
);
