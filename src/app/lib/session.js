import { SignJWT, jwtVerify } from "jose";
// import { getIronSession } from "iron-session";

// export const getSession = async (req, res) => {
//   const session = await getIronSession(req, res, {
//     password: process.env.COOKIE_KEY,
//     cookieName: process.env.COOKIE_NAME,
//     cookieOptions: {
//       secure: process.env.NODE_ENV === "production" ? true : false,
//       maxAge: undefined,
//     },
//   });
//   return session;
// };
const key = new TextEncoder().encode(process.env.SECRET_KEY);
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(key);
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
