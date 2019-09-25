import { connect } from "react-redux";
import { Operations } from "../modules/game";
import { Gamer, Board, NewGameAction } from "../modules/game/types";
import { Dispatch } from "redux";
import { AnyAction } from "redux";

import { GameComponent } from "../components/Game.component";

export interface StateProps {
  board: Board;
  gamer: Gamer;
  gameOver: boolean;
  winner: number;
}

export interface DispatchProps {
  gameTurn: (
    gamer: Gamer,
    row: number,
    col: number
  ) => (dispatch: Dispatch<AnyAction>) => void;
  checkWinner: (
    board: Board,
    gamer: Gamer
  ) => (dispatch: Dispatch<AnyAction>) => void;
  newGame: () => NewGameAction;
}

const mapStateToProps = (state: any): StateProps => {
  const { rootReducer } = state;
  const { game } = rootReducer;

  return {
    board: game.board,
    gamer: game.gamer,
    gameOver: game.gameOver,
    winner: game.winner
  };
};

const mapDispatchToProps: DispatchProps = {
  gameTurn: Operations.gameTurn,
  checkWinner: Operations.checkWinner,
  newGame: Operations.newGame
};

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(GameComponent);
