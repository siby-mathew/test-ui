// Constants
const ALLOWED_SPECIAL_CHARS = "_-";
const USERNAME_MIN_LENGTH = 1;
const USERNAME_MAX_LENGTH = 15;

/**
 * Validates a username string based on given rules.
 * @param {string} username
 * @returns {true | string} - true if valid, otherwise error message
 */
export const validateUsername = (username: string) => {
  if (typeof username !== "string" || username.trim() === "") {
    return "Username must be a non-empty string.";
  }

  if (username.includes(" ")) {
    return "Username cannot contain spaces.";
  }

  if (username.length < USERNAME_MIN_LENGTH) {
    return `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`;
  }

  if (username.length > USERNAME_MAX_LENGTH) {
    return `Username must be at most ${USERNAME_MAX_LENGTH} characters long.`;
  }

  const allowedCharsRegex = new RegExp(
    `^[a-zA-Z0-9${ALLOWED_SPECIAL_CHARS.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}]+$`
  );

  if (!allowedCharsRegex.test(username)) {
    return `Username can only contain letters, numbers, and these special characters: ${ALLOWED_SPECIAL_CHARS}`;
  }

  return true;
};
