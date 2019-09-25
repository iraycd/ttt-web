import * as React from "react";
import { SFC } from "react";

interface GameControlProps {
  open: boolean;
  isDraw: boolean;
  player: number;
  onClick: (val: boolean) => void;
  onClose: (val: boolean) => void;
}

export const GameControl: SFC<GameControlProps> = props => {
  const title = props.isDraw ? "Draw!" : `Player - ${props.player} wins!`;
  return (
    <div>
      <h1>{title}</h1>
      <p>Would you like to start a new game?</p>
      <div>
        <button onClick={() => props.onClick(false)} color="secondary">
          No
        </button>
        <button onClick={() => props.onClick(true)} color="primary" autoFocus>
          Yes
        </button>
      </div>
    </div>
  );
};
