import { SFC } from "react";
import * as React from "react";
import { Board } from "../modules/game/types";
import styled from "styled-components";
import { Grid } from "./Grid.component";
import { CellComponent } from "./Cell.component";

interface BoardProps {
  board: Board;
  onMove: (square: { row: number; col: number }) => void;
}

const BoardWrapper = styled.div`
  flex: 1 300px;
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  height: 300px;
  width: 300px;
  min-height: 300px;
`;

export const BoardComponent: SFC<BoardProps> = props => {
  const { board, onMove } = props;
  console.log(board);
  return (
    <BoardWrapper>
      {board.map((row, rIdx) =>
        row.map((col, cIdx) => (
          <CellComponent
            key={rIdx + cIdx}
            mark={col}
            cellState={{ row: rIdx, col: cIdx }}
            onMove={onMove}
          />
        ))
      )}
      <Grid />
    </BoardWrapper>
  );
};
