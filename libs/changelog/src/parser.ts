import {ChangeLogChange, ChangeLogUser, ChangelogVersion, TrelloCard, TrelloMember} from "./types";
import * as dayjs from "dayjs";
import {getCardType} from "./utils";

const parseCard = (card: TrelloCard): ChangeLogChange => {
  return {
    title: card.name,
    description: card.desc || undefined,
    type: getCardType(card),
    timeCreated: new Date(),
    timeUpdated: new Date(),
  };
};

const parseDeployCard = (card: TrelloCard): null | ChangelogVersion => {
  const checkVersion = (ver: string): boolean => {
    return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/g.test(ver);
  };

  const getVersion = (): null | string => {
    let version = card.name.replace('Deploy ', '');
    if (checkVersion(version)) return version;

    version = dayjs(card.dateLastActivity).format('DD/MM/YYYY');
    if (checkVersion(version)) return version;

    return null;
  };

  if (
    !card.name.startsWith('Deploy') &&
    !card.labels.some((label) => label.name === 'Deploy')
  )
    return null;

  const version = getVersion();
  if (!version) return null;

  return {
    version,
    date: dayjs(version, 'DD/MM/YYYY').toDate(),
    url: card.url,
    changes: [],
    timeCreated: new Date(),
    timeUpdated: new Date(),
  };
};

const parseMember = (member: TrelloMember): ChangeLogUser => ({
  fullName: member.fullName,
  trelloUrl: member.url,
  avatarUrl: member.avatarUrl,
  email: member.email,
  initials: member.initials,
  timeCreated: new Date(),
  timeUpdated: new Date(),
});

export {  parseCard, parseDeployCard, parseMember };
