export interface ColProps {
  diceValue: number;
  isTop: boolean;
  cells: number;
  onUpdate: Function;
}

export interface ColMidProps {
  diceValue: number;
  isLeft: boolean;
  onUpdate: Function;
}

export interface ColState {
  cellList: Boxs;
  diceValue: number;
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
