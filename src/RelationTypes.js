import { SYMBOLS } from "./RelationSymbols";
export const RELATION_TYPES = {
  CONDITION: "Condition",
  RESPONSE: "Response",
  EXCLUDE: "Exclude",
  INCLUDE: "Include",
  MILESTONE: "Milestone",
};

export const RELATION_COLORS = {
  "Condition": "orange",
  "Response": "blue",
  "Exclude": "red",
  "Include": "green",
  "Milestone": "purple",
};

export const RELATION_SYMBOLS = {
  "Condition": {
    FromSymbol: SYMBOLS.EMPTY_CHAR,
    ToSymbol: SYMBOLS.FILLED_DIAMOND,
  },
  "Response": {
    FromSymbol: SYMBOLS.FILLED_CIRCLE,
    ToSymbol: SYMBOLS.EMPTY_CHAR,
  },
  "Exclude": {
    FromSymbol: SYMBOLS.FILLED_CIRCLE,
    ToSymbol: SYMBOLS.PERCENT,
  },
  "Include": {
    FromSymbol: SYMBOLS.FILLED_CIRCLE,
    ToSymbol: SYMBOLS.PLUS,
  },
  "Milestone": {
    FromSymbol: SYMBOLS.EMPTY_CHAR,
    ToSymbol: SYMBOLS.EMPTY_DIAMOND,
  },
};