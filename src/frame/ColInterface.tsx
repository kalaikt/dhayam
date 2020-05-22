export interface ColProps {
  position: string;
  onUpdate: Function;
}

export interface ColMidProps {
  isLeft: boolean;
  onUpdate: Function;
}

export interface ColState {
  cellList: Boxs;
  prevValue: number;
}

interface Boxs {
  top: Array<CellBox>;
  left: Array<CellBox>;
  bottom: Array<CellBox>;
  right: Array<CellBox>;
}

interface CellBox {
  [x: string]: any;
  location: boolean;
  cellIndex: number;
}
