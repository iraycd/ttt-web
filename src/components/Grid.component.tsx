import * as React from "react";
import rough from "roughjs";
import styled from "styled-components";

const CanvasGrid = styled.canvas`
  position: absolute;
  z-index: 0;
`;

export class Grid extends React.Component<{}, {}> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: {}) {
    super(props);
    this.canvasRef = React.createRef();
  }

  public componentDidMount = () => {
    if (this.canvasRef.current && rough) {
      const rc = rough.canvas(this.canvasRef.current);
      rc.line(100, 0, 100, 300);
      rc.line(200, 0, 200, 300);
      rc.line(0, 100, 300, 100);
      rc.line(0, 200, 300, 200);
    }
  };

  public render() {
    return (
      <CanvasGrid
        id="gridCanvas"
        ref={this.canvasRef}
        height="300"
        width="300"
      />
    );
  }
}
