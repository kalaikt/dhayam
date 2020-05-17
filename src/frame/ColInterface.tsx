export interface ColProps {
  diceValue: number;
  isTop: boolean;
  cells: number;
}

export interface ColMidProps {
  diceValue: number;
  isLeft: boolean;
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
  location: boolean;
  cellIndex: number;
}
