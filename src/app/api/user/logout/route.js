import { cookies } from "next/headers";

export async function GET() {
  let status = 500;
  let message = "";
  try {
    cookies().set("test", "", { maxAge: -1 });
    status = 200;
    message = "Logout successful";
  } catch (error) {
    message = "Logout failed";
  }
  return new Response(JSON.stringify({ message }), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
