import CryptoJS from "crypto-js";
const g2wBMZxrwz =
  "3y40vcarMO6OfKJUmIa8EM2bKnNbYM31Ej1O25GiXMAFxC4rS7Rh5Ln2KxXBQmoi";
const mIv = "64ce08ea5af126076f7148055c4bbf3f";

export const getSaltIV = () => {
  const i = CryptoJS.lib.WordArray.random(16);
  const s = CryptoJS.lib.WordArray.random(16);
  return {
    salt: s.toString(CryptoJS.enc.Hex),
    iv: i.toString(CryptoJS.enc.Hex),
  };
};

export const encryptData = (data: string, _i?: string, encKey?: string) => {
  const iv = CryptoJS.enc.Hex.parse(_i ?? mIv);
  const options = { mode: CryptoJS.mode.CTR, iv: iv };
  const encrypted = CryptoJS.AES.encrypt(data, encKey ?? g2wBMZxrwz, options);
  return encrypted.toString() as string;
};

export const decryptData = (enStr: string, _i?: string, encKey?: string) => {
  try {
    const iv = CryptoJS.enc.Hex.parse(_i ?? mIv);
    const options = { mode: CryptoJS.mode.CTR, iv: iv };
    const decrypted = CryptoJS.AES.decrypt(
      enStr,
      encKey ?? g2wBMZxrwz,
      options
    );
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText as string;
  } catch {
    return "Failed to decrypt";
  }
};
