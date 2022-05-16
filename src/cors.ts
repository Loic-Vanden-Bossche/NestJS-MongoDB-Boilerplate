import {Environment} from "./config/config.default";

const checkOrigin = (
  env: Environment,
  origin: string,
  whitelistUrls: string[],
) => {
  switch (env) {
    case Environment.PROD:
      return whitelistUrls.indexOf(origin) !== -1;
    case Environment.PREPROD:
      return !origin || whitelistUrls.indexOf(origin) !== -1;
    case Environment.DEV || Environment.TEST:
      return true;
    default:
      return false;
  }
};

export { checkOrigin };
