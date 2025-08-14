import bcrypt from "bcrypt";
import { addUserModel, getUserModel, deleteUserModel, getUserByNameModel } from "./model.js";
import { generateOtp, saveOtp, getOtp, deleteOtp, sendOtpEmail } from "../../utils/optService.js";
import redis from "../../config/redis.js";

const saltRounds = 10;

export async function registerUserService({ username, email, password }) {
  if (!username) throw new Error("Username Required");
  const isUserExisted = await getUserByNameModel(username);
  if (isUserExisted) throw new Error("User already existed");
  if (!password) throw new Error("Email Required");
  if (!email) throw new Error("Password Required");

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const opt = generateOtp();

  await saveOtp(email, opt);
  await redis.set(
    `reg:${email}`,
    JSON.stringify({ username, email, password: hashedPassword }),
    { EX: 300 } // 5 minutes
  );
  await sendOtpEmail(email, opt);
  return { message: "OTP sent. Please verify to complete registration in 5 minutes." };
}

export async function verifyOptService(email, opt) {
  const storedOpt = await getOtp(email);
  console.log("stored opt", storedOpt);
  console.log("opt", opt);

  if (!storedOpt) throw new Error("OTP expired or not found");
  if (opt !== storedOpt) throw new Error("invalid OPT");

  const regDataJSON = await redis.get(`reg:${email}`);
  if (!regDataJSON) throw new Error("Registration info expired");

  const { username, password } = JSON.parse(regDataJSON);

  await addUserModel({
    username,
    email,
    password,
  });
  await deleteOtp(email);
  await redis.del(`reg:${email}`);
  return { message: "successfuly register the account" };
}

export async function deleteUserService(id, password) {
  const user = await getUserModel(id);
  if (!user) throw new Error("User Not Found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Incorrect Password");

  const deleted = await deleteUserModel(id);
  if (!deleted) throw new Error("Failed to delete user");
  return deleted;
}

export async function verifyUserService({ username, password }) {
  const result = await getUserByNameModel(username);
  if (!result) throw new Error("User Not Found");
  const match = await bcrypt.compare(password, result.password);
  if (!match) throw new Error("Incorrect Password");
  return result;
}
