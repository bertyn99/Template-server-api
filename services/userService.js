import User from "../db/model/user.js";
import config from "../config.js";
import { hashPassword, verifyPassword } from "./hashingService.js";

const { JWT_SECRET } = config;
export async function register(userData) {
  const user = new User(userData);
  try {
    await hashPassword(user);
    await user.save();
    const token = await generateAuthToken(user);
    const { password, ...useWithoutPassword } = user._doc;
    return { ...useWithoutPassword, accessToken: token };
  } catch (e) {
    throw e;
  }
}

export async function logIn(email, password) {
  try {
    const user = await findByCredentials(email, password);
    const token = await generateAuthToken(user);
    const { password, ...useWithoutPassword } = user._doc;
    return { ...useWithoutPassword, accessToken: token };
  } catch (e) {
    throw e;
  }
}

export async function myInfo(_id) {
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("This is a wrong id");
    }
    return user;
  } catch (e) {
    throw e;
  }
}

export async function updateInfo(user, body) {
  const allowedUpdates = ["name", "email", "password"];
  const updates = Object.keys(body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    throw new Error("Invalid Updates!");
  }

  try {
    updates.forEach((update) => (user[update] = body[update]));
    await user.save();
    return user;
  } catch (e) {
    throw e;
  }
}

export async function deleteUser(user) {
  try {
    await user.remove();
    return user;
  } catch (e) {
    throw e;
  }
}

export async function generateAuthToken(user) {
  const token = sign({ _id: user._id.toString() }, JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

export async function findByCredentials(email, password) {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new Error("Unable to login.");
  }

  const isMatch = await verifyPassword(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login.");
  }
  return user;
}
