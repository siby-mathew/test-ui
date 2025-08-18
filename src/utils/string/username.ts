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

  // Trim spaces for checking, but spaces are not allowed
  if (username.includes(" ")) {
    return "Username cannot contain spaces.";
  }

  if (username.length < USERNAME_MIN_LENGTH) {
    return `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`;
  }

  if (username.length > USERNAME_MAX_LENGTH) {
    return `Username must be at most ${USERNAME_MAX_LENGTH} characters long.`;
  }

  // Allowed characters: lowercase letters, digits, underscore, dot
  const allowedCharsRegex = /^[a-z0-9._]+$/;
  if (!allowedCharsRegex.test(username)) {
    return "Username can only contain lowercase letters, numbers, underscores (_), and dots (.)";
  }

  // Format restrictions
  if (username.startsWith("_") || username.endsWith("_")) {
    return "Username cannot start or end with an underscore (_).";
  }

  if (username.startsWith(".") || username.endsWith(".")) {
    return "Username cannot start or end with a dot (.).";
  }

  if (username.includes("..")) {
    return "Username cannot contain consecutive dots (..).";
  }

  return true;
};
