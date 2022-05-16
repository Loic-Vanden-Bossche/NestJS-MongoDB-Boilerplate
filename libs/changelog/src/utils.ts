import {ChangeType, TrelloCard} from "./types";

const labelMatch = (card: TrelloCard, str: string): boolean =>
  card.labels.some((label) => label.name.toLowerCase() === str.toLowerCase());

const getCardType = (card: TrelloCard): ChangeType => {
  if (labelMatch(card, 'Bug')) return ChangeType.BUG;
  if (labelMatch(card, 'Docs')) return ChangeType.DOCUMENTATION;
  if (labelMatch(card, 'Tests')) return ChangeType.TEST;
  if (labelMatch(card, 'Evol')) return ChangeType.IMPROVEMENT;
  return ChangeType.FEATURE;
};

export { labelMatch, getCardType };
