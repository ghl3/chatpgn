export interface Move {
  from: string;
  to: string;
  promotion?: string | undefined;
  color: "w" | "b";
  piece?: string;
  san?: string;
  captured?: string;
  flags?: string;
  lan?: string;
  before?: string;
  after?: string;
}
