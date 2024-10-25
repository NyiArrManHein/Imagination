import { encrypt } from "@/app/lib/session";
import { isEmail } from "@/app/lib/util";
import {
  getUserByEmail,
  getUserByUsername,
  insertSessionIdByEmail,
} from "@/app/query/user/query";
import { cookies } from "next/headers";

export async function POST(request) {
  let msg = "";
  let status = 500;
  const response = new Response();

  const { username_or_email, password } = await request.json();
  const user = isEmail(username_or_email)
    ? await getUserByEmail(username_or_email)
    : await getUserByUsername(username_or_email);
  if (user) {
    if (!user.verified) {
      msg =
        "Your email is not verified. Please verify your email before logging in.";
    } else if (password === user.password) {
      try {
        const { sessionId, message } = await insertSessionIdByEmail(user.email);
        if (sessionId) {
          status = 200;
          cookies().set("test", sessionId);
        } else {
          status = 400;
        }
        msg = message;
      } catch (error) {
        status = 500;
        msg = "Internal Server Error";
      }
    } else {
      msg = "Incorrect password.Please try again.";
    }
  } else {
    msg = "Incorrect username or email.Please try again.";
  }
  return new Response(JSON.stringify({ msg }), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
