import AES from "crypto-js/aes";
import EncUTF8 from "crypto-js/enc-utf8";

export const encrypt = (data, key) =>
  AES.encrypt(JSON.stringify(data), key).toString();

export const decrypt = (encryptedData, key) =>
  JSON.parse(AES.decrypt(encryptedData, key).toString(EncUTF8));

export const cacheCard = (values) => {
  const encryptedValues = encrypt(values, process.env.NEXT_PUBLIC_ENCRYPT_KEY);
  localStorage.setItem(process.env.NEXT_PUBLIC_KEY_CACHE, encryptedValues);
  return encryptedValues;
};
