
export enum TreeState {
  CHAOS = 'CHAOS',
  FORMED = 'FORMED'
}

export interface DualPosition {
  chaos: [number, number, number];
  formed: [number, number, number];
  weight: number;
}
