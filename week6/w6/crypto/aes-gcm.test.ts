import assert from "node:assert/strict";
import { test } from "node:test";

import {
  decrypt,
  encrypt,
  generateKey,
} from "./aes-gcm";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

test("encrypt lalu decrypt menghasilkan plaintext asli", () => {
  const key = generateKey();
  const plaintext = textEncoder.encode("LastKey secure vault");

  const encrypted = encrypt(plaintext, key);
  const decrypted = decrypt(encrypted, key);

  assert.equal(textDecoder.decode(decrypted), "LastKey secure vault");
});

test("enkripsi plaintext yang sama menghasilkan nonce berbeda", () => {
  const key = generateKey();
  const plaintext = textEncoder.encode("LastKey secure vault");

  const encrypted1 = encrypt(plaintext, key);
  const encrypted2 = encrypt(plaintext, key);

  assert.notDeepEqual(encrypted1.nonce, encrypted2.nonce);
});

test("perubahan ciphertext menyebabkan dekripsi gagal", () => {
  const key = generateKey();
  const plaintext = textEncoder.encode("LastKey secure vault");

  const encrypted = encrypt(plaintext, key);

  encrypted.ciphertext[0] ^= 1;

  assert.throws(() => {
    decrypt(encrypted, key);
  });
});

test("key yang salah menyebabkan dekripsi gagal", () => {
  const key = generateKey();
  const wrongKey = generateKey();
  const plaintext = textEncoder.encode("LastKey secure vault");

  const encrypted = encrypt(plaintext, key);

  assert.throws(() => {
    decrypt(encrypted, wrongKey);
  });
});