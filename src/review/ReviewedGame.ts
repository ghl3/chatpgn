export interface MoveDescription {
  color: "white" | "black";
  move: string;
  description: string;
}

export interface OverallDescription {
  description: string;
}

export interface ReviewedGame {
  overallDescription: string;
  moveDescriptions: MoveDescription[];
}
