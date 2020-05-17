export interface CellProps {
  index: number;
  isTop: boolean;
  showLocation: boolean;
  cellIndex: number;
  onPress: Function;
}

export interface CellState {
  index: number;
  isTop: boolean;
  showLocation: boolean;
  cellIndex: number;
}

export interface CellMidProps {
  index: number;
  isLeft: boolean;
  showLocation: boolean;
  cellIndex: number;
  onPress: Function;
}

export interface CellMidState {
  index: number;
  isLeft: boolean;
  showLocation: boolean;
  cellIndex: number;
}