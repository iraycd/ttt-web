import * as React from "react";
import rough from "roughjs";
import styled from "styled-components";

const CellCanvas = styled.canvas`
  z-index: 1;
`;

interface CellProps {
  mark: number;
  cellState: { row: number; col: number };
  onMove: (square: { row: number; col: number }) => void;
}

export class CellComponent extends React.Component<CellProps> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: CellProps) {
    super(props);
    this.canvasRef = React.createRef();
  }

  public componentDidUpdate = () => {
    this.drawCellState();
  };

  public componentWillUpdate = () => {
    this.drawCellState();
  };

  public render() {
    return (
      <CellCanvas
        ref={this.canvasRef}
        height="100"
        width="100"
        className="cell"
        onClick={() => this.props.onMove(this.props.cellState)}
      />
    );
  }

  private drawCellState(): void {
    const canvas = this.canvasRef.current;
    if (canvas && rough) {
      const rc = rough.canvas(canvas);
      if (this.props.mark === 1) {
        rc.line(20, 20, 80, 80);
        rc.line(20, 80, 80, 20);
      } else if (this.props.mark === 2) {
        rc.circle(50, 50, 60);
      } else {
        // clear any drawings on the canvas
        const context = canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }
}
