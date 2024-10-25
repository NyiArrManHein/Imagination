import { insertUser } from "@/app/query/user/query";
export async function POST(request) {
  let message = "";
  let user = null;
  let status = 500;
  const { username, email, password } = await request.json();
  try {
    const { registeredUser, msg } = await insertUser(
      username,
      email,
      password,
      request.headers.get("host")
    );
    if (registeredUser) {
      status = 200;
      message = msg;
      user = registeredUser;
    } else {
      status = 400;
      message = msg;
    }
  } catch (error) {
    status = 500;
    message = "Internal Server Error";
  }
  return new Response(JSON.stringify({ message, user }), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
