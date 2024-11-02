import crypto from "crypto";
import nodemailer from "nodemailer";

import { getUserBySessionId } from "../query/user/query";
import { cookies } from "next/headers";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
export function generateToken() {
  return crypto.randomBytes(16).toString("hex");
}

export function getExpireDate(mins) {
  let now = new Date();
  now.setMinutes(now.getMinutes() + (mins ? mins : 15));
  return now;
}

export async function sendMailWithNodemailer(email, subject, template) {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.USER,
    to: email,
    subject: subject,
    html: ReactDOMServer.renderToString(template),
  });
  return info.messageId;
}

export function isEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export async function isAuth() {
  let user = null;
  const sessionId = cookies().get("test")?.value;
  if (sessionId) {
    const dbUser = await getUserBySessionId(sessionId);
    if (dbUser) {
      user = dbUser;
      return { isLoggedIn: true, user };
    }
  }

  return { isLoggedIn: false, user };
}

export async function firebaseUpload(imageFile) {
  let imageUrl = null;

  if (imageFile) {
    try {
      const imageFileName = Date.now().toString() + "_" + imageFile.name;
      const storageRef = ref(storage, `images/${imageFileName}`);
      await uploadBytes(storageRef, imageFile);
      console.log("Upload successful");
      imageUrl = await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading the file", error);
    }
  } else {
    console.log("There is no file");
  }

  return imageUrl;
}
