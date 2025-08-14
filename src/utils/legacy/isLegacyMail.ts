import { StorageVersion } from "src/types";

export const isLegacyMail = (version: StorageVersion) => {
  return (
    [StorageVersion.pinata, StorageVersion.pinataMobile].indexOf(version) === -1
  );
};

export const isMailOriginMobile = (version: StorageVersion) => {
  return version === StorageVersion.pinataMobile;
};
