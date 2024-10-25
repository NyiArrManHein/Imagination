import {
  getUserByVerifyTokenAndVerified,
  updateVerifiedByVerifyToken,
} from "@/app/query/user/query";

export async function POST(request) {
  let isVerified = false;
  let message = "Verification Failed";
  let status = 500;
  const { token } = await request.json();
  try {
    const user = await getUserByVerifyTokenAndVerified(token, false);
    if (user) {
      const verifiedUser = await updateVerifiedByVerifyToken(token);
      if (verifiedUser) {
        status = 200;
        message = "User verified successfully.";
        console.log("api user verified");
        isVerified = true;
      } else {
        status = 400;
        message = "User not verified";
        console.log("api user not verified");
      }
    }
  } catch (error) {
    status = 500;
    message = "Internal Server Error";
    console.log("api server error");
  }
  return new Response(JSON.stringify({ message, isVerified }), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
