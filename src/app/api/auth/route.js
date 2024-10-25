import { isAuth } from "@/app/lib/util";

export async function GET() {
  const { isLoggedIn, user } = await isAuth();
  console.log("logged in status", isLoggedIn, " userInfo", user);

  return new Response(JSON.stringify({ isLoggedIn, user }));
}
