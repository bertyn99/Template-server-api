import { hash, verify } from "@node-rs/argon2";

export async function hashPassword(password) {
  return await hash(password);
}

export async function verifyPassword(password, hashedPassword) {
  return await verify(hashedPassword, password);
}
