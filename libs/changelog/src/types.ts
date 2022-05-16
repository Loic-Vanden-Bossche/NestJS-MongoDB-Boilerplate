interface TrelloLabel {
  id: string;
  idBoard: string;
  name: string;
  color: string;
}

interface TrelloBadges {
  trello: { board: number; card: number };
}

interface TrelloMember {
  id: string;
  aaId: string;
  activityBlocked: boolean;
  avatarHash: string;
  avatarUrl: string;
  bio: string;
  bioData: unknown;
  confirmed: boolean;
  fullName: string;
  idEnterprise: unknown;
  idEnterprisesDeactivated: [];
  idMemberReferrer: unknown;
  idPremOrgsAdmin: [];
  initials: string;
  memberType: string;
  nonPublic: unknown;
  nonPublicAvailable: boolean;
  products: [];
  url: string;
  username: string;
  status: string;
  aaBlockSyncUntil: unknown;
  aaEmail: unknown;
  aaEnrolledDate: unknown;
  avatarSource: string;
  credentialsRemovedCount: number;
  domainClaimed: unknown;
  email: string;
  goldSunsetFreeTrialIdOrganization: unknown;
  gravatarHash: string;
  idBoards: string[];
  idOrganizations: string[];
  idEnterprisesAdmin: [];
  limits: { boards: unknown[]; orgs: unknown[] };
  loginTypes: string[];
  marketingOptIn: { optedIn: boolean; date: Date };
  messagesDismissed: unknown[];
  oneTimeMessagesDismissed: string[];
  prefs: {
    privacy: unknown;
    sendSummaries: boolean;
    minutesBetweenSummaries: number;
    minutesBeforeDeadlineToNotify: number;
    colorBlind: boolean;
    locale: string;
  };
  trophies: [];
  uploadedAvatarHash: unknown;
  uploadedAvatarUrl: unknown;
  premiumFeatures: string[];
  isAaMastered: boolean;
  ixUpdate: string;
}

interface TrelloCard {
  id: string;
  badges: {
    attachmentsByType: TrelloBadges;
    location: boolean;
    votes: number;
    viewingMemberVoted: boolean;
    subscribed: boolean;
    fogbugz: string;
    checkItems: number;
    checkItemsChecked: number;
    checkItemsEarliestDue: unknown;
    comments: number;
    attachments: number;
    description: boolean;
    due: unknown;
    dueComplete: boolean;
    start: unknown;
  };
  checkItemStates: unknown;
  closed: boolean;
  dueComplete: boolean;
  dateLastActivity: string;
  desc: string;
  descData: { emoji: unknown };
  due: unknown;
  dueReminder: unknown;
  email: unknown;
  idBoard: string;
  idChecklists: [];
  idList: string;
  idMembers: string[];
  idMembersVoted: [];
  idShort: number;
  idAttachmentCover: unknown;
  labels: TrelloLabel[];
  idLabels: string[];
  manualCoverAttachment: boolean;
  name: string;
  pos: number;
  shortLink: string;
  shortUrl: string;
  start: unknown;
  subscribed: boolean;
  url: string;
  cover: {
    idAttachment: unknown;
    color: unknown;
    idUploadedBackground: unknown;
    size: string;
    brightness: string;
    idPlugin: unknown;
  };
  isTemplate: boolean;
  cardRole: unknown;
}

interface Changelog {
  title: string;
  description: string;
  unreleased: ChangeLogChange[];
  versions: ChangelogVersion[];
  users: ChangeLogUser[];
  timeCreated: Date;
  timeUpdated: Date;
}

interface ChangelogVersion {
  version: string;
  date: Date;
  url: string;
  changes: ChangeLogChange[];
  timeCreated: Date;
  timeUpdated: Date;
}

interface ChangeLogChange {
  title: string;
  description?: string;
  type: ChangeType;
  timeCreated: Date;
  timeUpdated: Date;
}

interface ChangeLogUser {
  fullName: string;
  trelloUrl: string;
  avatarUrl: string;
  email: string;
  initials: string;
  timeCreated: Date;
  timeUpdated: Date;
}

enum ChangeType {
  FEATURE = 'Fonctionnalités',
  IMPROVEMENT = 'Améliorations',
  BUG = 'Bugs',
  DOCUMENTATION = 'Documentations',
  TEST = 'Tests',
}

namespace ChangeType {
  export function valueOf(str: string) {
    return ChangeType[str as keyof typeof ChangeType];
  }
}

export {
  Changelog,
  ChangeType,
  ChangeLogChange,
  ChangelogVersion,
  ChangeLogUser,
  TrelloCard,
  TrelloLabel,
  TrelloBadges,
  TrelloMember,
};
