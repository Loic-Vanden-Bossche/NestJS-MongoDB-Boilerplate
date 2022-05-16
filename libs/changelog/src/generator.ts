import * as axios from "axios";
import {
  Changelog,
  ChangeLogChange,
  ChangeLogUser,
  ChangelogVersion,
  ChangeType,
  TrelloCard,
  TrelloMember
} from "./types";
import fs from "fs";
import {getVersionByIndex} from "./version";
import {toTitleCase} from "@boilerplate/utils";
import * as dayjs from "dayjs";
import {getAvatarUrl} from "./avatar";
import {parseCard, parseDeployCard, parseMember} from "./parser";
import path from "path";
import * as customParseFormat from "dayjs/plugin/customParseFormat";

import * as dotenv from 'dotenv';

require('dayjs/locale/fr');
dayjs.extend(customParseFormat);
dayjs.locale('fr');

const generateContributorsList = (users: ChangeLogUser[]) => {
  let body = '';

  body += '### Contributors\n\n';
  body += '<table>\n\t<tr>\n';

  users.forEach((user) => {
    body += `\t\t<td align="center"><a href="${
      user.trelloUrl
    }"><img src="${getAvatarUrl(user)}" width="100px;" alt=""/><br /><sub><b>${
      user.fullName
    }</b></sub></a></td>\n`;
  });

  body += '\t</tr>\n</table>';
  body += '\n\n';

  return body;
};

const generateChangeList = (changes: ChangeLogChange[]) => {
  let body = '';

  const groupedChanges = changes.reduce((acc, card) => {
    if (!acc[card.type]) acc[card.type] = [];
    acc[card.type].push(card);
    return acc;
  }, {} as { [key in ChangeType]: ChangeLogChange[] });

  Object.keys(ChangeType).forEach((stringType) => {
    const type = ChangeType.valueOf(stringType) as ChangeType;
    if (!groupedChanges[type]) return;
    body += `### ${type}\n\n`;

    groupedChanges[type].forEach((card) => {
      body += `* ${card.title}\n`;
      if (card.description)
        body += `\n\t* ${card.description
          .split('\n\n')
          .map((desc) => '`' + desc + '`')
          .join('\n\t* ')}\n\n`;
    });
  });

  body += '---\n';

  return body;
};

const generateChangelog = (changelog: Changelog, trelloLink: string) => {
  let body = '';
  body += `# ${changelog.title}\n\n`;
  body += `${changelog.description}`;

  if (changelog.unreleased.length) {
    body += `\n\n## [Unreleased]\n\n`;
    body += generateChangeList(changelog.unreleased);
  }

  changelog.versions.forEach((version) => {
    body += `\n\n## [${version.version}] - ${toTitleCase(
      dayjs(version.date).format('dddd D MMMM YYYY'),
    )}\n\n`;

    body += generateChangeList(version.changes);
  });
  body += '\n\n';

  body += generateContributorsList(changelog.users);

  changelog.versions.forEach((version) => {
    body += `[${version.version}]: ${version.url}\n`;
  });

  if (changelog.unreleased.length) {
    body += `[Unreleased]: ${trelloLink}\n`;
  }

  return body;
};


const generate = async () => {

  dotenv.config({ path: path.join(process.cwd(), '.env') });

  const apiKey = process.env.TRELLO_API_KEY;
  const apiToken = process.env.TRELLO_API_TOKEN;
  const stagingListId = process.env.TRELLO_STAGING_LIST_ID;
  const trelloLink = process.env.TRELLO_LINK;

  const changelogPath = `../${process.env.CHANGELOG_NAME || 'TEST'}.md`;

  if (!apiKey || !apiToken || !stagingListId || !trelloLink) {
    console.error('Missing environment variables');
    return;
  }

  const cards = await axios.default
    .get<TrelloCard[]>(
      `https://api.trello.com/1/lists/${stagingListId}/cards?key=${apiKey}&token=${apiToken}`,
    )
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

  const members = await Promise.all(
    [...new Set(cards.flatMap((card) => card.idMembers))].map((id) =>
      axios.default
        .get<TrelloMember>(
          `https://api.trello.com/1/members/${id}?key=${apiKey}&token=${apiToken}`,
        )
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
    ),
  );

  const changelog: Changelog = {
    title: 'Changelog',
    description:
      'All notable changes to this project will be documented in this file.',
    versions: [],
    unreleased: [],
    users: members.map((member) => parseMember(member)),
    timeCreated: new Date(),
    timeUpdated: new Date(),
  };

  changelog.versions = cards.reduce((acc, card) => {
    const version = parseDeployCard(card);
    if (version) {
      acc.push(version);
    } else {
      acc[acc.length - 1]
        ? acc[acc.length - 1].changes.push(parseCard(card))
        : changelog.unreleased.push(parseCard(card));
    }
    return acc;
  }, [] as ChangelogVersion[]);

  changelog.versions.forEach((version, index) => {
    version.version = getVersionByIndex(changelog.versions.length - index);
  });

  fs.writeFileSync(
    'changelog/changelog.json',
    JSON.stringify(changelog, null, 2),
  );
  fs.writeFileSync(changelogPath, generateChangelog(changelog, trelloLink));
}

export { generate };
