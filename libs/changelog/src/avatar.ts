import {ChangeLogUser} from "./types";

const getAvatarUrl = (user: ChangeLogUser): string =>
  user.avatarUrl
    ? `${user.avatarUrl}/50.png`
    : `https://ui-avatars.com/api/?rounded=true&background=random&name=${user.fullName}`;

export {getAvatarUrl};
