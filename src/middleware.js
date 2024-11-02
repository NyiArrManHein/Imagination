import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const authToken = request.cookies.get("test");
  if (request.nextUrl.pathname === "/create" && !authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};
