import { gcm } from "@noble/ciphers/aes.js";

const KEY_LENGTH = 32;
const NONCE_LENGTH = 12;

export interface EncryptedData {
  ciphertext: Uint8Array;
  nonce: Uint8Array;
}

function randomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

export function generateKey(): Uint8Array {
  return randomBytes(KEY_LENGTH);
}

export function encrypt(
  plaintext: Uint8Array,
  key: Uint8Array
): EncryptedData {
  if (key.length !== KEY_LENGTH) {
    throw new Error("AES-256 key must be exactly 32 bytes");
  }

  const nonce = randomBytes(NONCE_LENGTH);
  const cipher = gcm(key, nonce);

  const ciphertext = cipher.encrypt(plaintext);

  return {
    ciphertext,
    nonce,
  };
}

export function decrypt(
  encryptedData: EncryptedData,
  key: Uint8Array
): Uint8Array {
  if (key.length !== KEY_LENGTH) {
    throw new Error("AES-256 key must be exactly 32 bytes");
  }

  const cipher = gcm(key, encryptedData.nonce);

  return cipher.decrypt(encryptedData.ciphertext);
}