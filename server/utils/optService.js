import otpGenerator from "otp-generator";
import redis from "../config/redis.js";
import { sendEmail } from "./emailService.js";

// Generate OTP
export function generateOtp(length = 6) {
  return otpGenerator.generate(length, { upperCaseAlphabets: false, specialChars: false });
}

// Save OTP to Redis with expiration (e.g., 5 minutes)
export async function saveOtp(email, otp) {
  await redis.set(`otp:${email}`, otp, { EX: 300 });
  return { message: "OTP saved" };
}

// Get OTP from Redis
export async function getOtp(email) {
  const result = await redis.get(`otp:${email}`);
  if (!result) throw new Error("User not found");
  return result;
}

// Delete OTP from Redis
export async function deleteOtp(email) {
  const result = await redis.del(`otp:${email}`);
  if (result === 0) throw new Error("key does not exist");
  return true;
}

// Send OTP via email
export async function sendOtpEmail(email, otp) {
  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    html: `<b>Your OTP is ${otp}</b>`,
  });
  return { message: "OTP sent. Please verify to complete registration in 5 minutes." };
}
