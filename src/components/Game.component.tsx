import * as React from "react";
import { StateProps, DispatchProps } from "../containers/Game.container";
import { BoardComponent } from "./Board.component";
import { GamerProfile } from "./GamerProfile.component";
import { GameControl } from "./GamerControl.component";

type Props = StateProps & DispatchProps;

interface State {
  showDialog: boolean;
}

export class GameComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showDialog: false };
  }

  handleBoardOnMove = (square: { row: number; col: number }): void => {
    console.log(square);
    const { board, gamer, gameOver, gameTurn, checkWinner } = this.props;
    const { row, col } = square;

    if (gameOver || board[row][col] !== 0) {
      return;
    }

    gameTurn(gamer, row, col);
    const hasWinner = checkWinner(board, gamer);

    if (hasWinner) {
      this.setState({ showDialog: true });
    }
  };

  handleDialogClick = (answer: boolean): void => {
    if (answer) {
      this.props.newGame();
    }

    this.setState({ showDialog: false });
  };

  handleDialogClose = () => {
    this.setState({ showDialog: false });
  };

  public render() {
    const { showDialog } = this.state;
    const { board, gamer, gameOver, winner } = this.props;
    const draw = winner === 0;

    return (
      <div>
        <BoardComponent board={board} onMove={this.handleBoardOnMove} />
        <GamerProfile gamer={gamer} gameOver={gameOver} />
        <GameControl
          open={showDialog}
          isDraw={draw}
          player={winner}
          onClick={this.handleDialogClick}
          onClose={this.handleDialogClose}
        />
      </div>
    );
  }
}
