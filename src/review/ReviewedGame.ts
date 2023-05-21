export interface MoveDescription {
  color: "white" | "black";
  move: string;
  description: string;
}

export interface TurnDescription {
  white: MoveDescription;
  black?: MoveDescription;
}

export interface ReviewedGame {
  turnDescriptions: TurnDescription[];
  overallDescription: string;
}

const normalizeWhitespace = (input: string): string => {
  return input
    .trim() // Remove beginning and trailing whitespace
    .replace(/\s+/g, " "); // Replace newlines and multiple whitespaces with a single space
};

const concatenateNormalizedStrings = (strings: string[]): string => {
  return normalizeWhitespace(strings.join(" "));
};

export const parseMoveDescription = (
  moveWithDescription: string,
  color: "white" | "black"
): MoveDescription => {
  const regex = /(\S+)\s+\{([^}]+)\}/;
  const match = moveWithDescription.match(regex);

  if (match) {
    const [, move, description] = match;
    return {
      color,
      move,
      description: normalizeWhitespace(description),
    };
  }

  return { color: "white", move: "", description: "" };
};

export const parseAnnotationLine = (line: string): MoveDescription => {
  const regex = /^(\d+\.)?\s+((\S+)\s+\{[^}]+\})/;
  const match = line.match(regex);

  if (match) {
    const [moveNumber, move, description] = match;
    return { color: "black", move: move, description: description };
  } else {
    throw new Error("Invalid annotation line");
  }
};

export const parseGameText = (gameText: string): ReviewedGame => {
  const lines = gameText.split("\n");
  const turnDescriptions: TurnDescription[] = [];
  const overallDescriptionText: string[] = [];

  for (const line of lines) {
    const regex = /^\d+\.\s+((\S+)\s+\{[^}]+\})(\s+((\S+)\s+\{[^}]+\}))?/;
    const match = line.match(regex);

    if (match) {
      const [, whiteMove, , blackMove] = match;
      const whiteMoveDescription = parseMoveDescription(whiteMove, "white");
      const blackMoveDescription = blackMove
        ? parseMoveDescription(blackMove, "black")
        : undefined;
      turnDescriptions.push({
        white: whiteMoveDescription,
        black: blackMoveDescription,
      });
    } else {
      overallDescriptionText.push(line);
    }
  }

  const overallDescription = concatenateNormalizedStrings(
    overallDescriptionText
  );
  return {
    turnDescriptions,
    overallDescription,
  };
};

export const getMoveDescriptions = (
  parsedGame: ReviewedGame
): MoveDescription[] => {
  const { turnDescriptions } = parsedGame;
  const moveDescriptions: MoveDescription[] = [];
  for (const turnDescription of turnDescriptions) {
    moveDescriptions.push(turnDescription.white);
    if (turnDescription.black) {
      moveDescriptions.push(turnDescription.black);
    }
  }
  return moveDescriptions;
};
