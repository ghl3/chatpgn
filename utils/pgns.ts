import { ParsedPGN } from "pgn-parser";

export const fischer_spassky: ParsedPGN = {
  comments_above_header: null,
  headers: [
    { name: "Event", value: "F/S Return Match" },
    { name: "Site", value: "Belgrade, Serbia JUG" },
    { name: "Date", value: "1992.11.04" },
    { name: "Round", value: "29" },
    { name: "White", value: "Fischer, Robert J." },
    { name: "Black", value: "Spassky, Boris V." },
    { name: "Result", value: "1/2-1/2" },
  ],
  comments: null,
  moves: [
    { move: "e4", comments: [], move_number: 1 },
    { move: "e5", comments: [] },
    {
      move: "Nf3",
      comments: ["This is the Knight's Opening."],
      move_number: 2,
    },
    { move: "Nc6", comments: [] },
    { move: "Bb5", comments: ["The Ruy Lopez Opening."], move_number: 3 },
    { move: "a6", comments: [] },
    { move: "Ba4", comments: [], move_number: 4 },
    { move: "Nf6", comments: [] },
    { move: "O-O", comments: [], move_number: 5 },
    { move: "Be7", comments: [] },
    { move: "Re1", comments: [], move_number: 6 },
    { move: "b5", comments: [] },
    { move: "Bb3", comments: ["The bishop retreats."], move_number: 7 },
    { move: "d6", comments: [] },
    { move: "c3", comments: [], move_number: 8 },
  ],
  result: "1/2-1/2",
};
