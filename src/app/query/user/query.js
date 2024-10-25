import prisma from "@/app/db";
import EmailTemplate from "@/app/email/EmailTemplate";
import {
  generateToken,
  getExpireDate,
  sendMailWithNodemailer,
} from "@/app/lib/util";

export async function insertUser(username, email, password, host) {
  let msg = "";
  let registeredUser = null;

  const isUserExist = await prisma.user.findFirst({
    where: { OR: [{ email: email }, { username: username }] },
  });

  if (isUserExist === null) {
    try {
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: password,
          verifyToken: generateToken(),
          verifyTokenExpire: getExpireDate(1440),
        },
      });
      if (user) {
        registeredUser = user;
        msg = `Registered successfully as ${registeredUser.username}.`;
        const template = EmailTemplate({
          description: "to complete verification",
          username: registeredUser.username,
          token: registeredUser.verifyToken,
          host: host,
          path: "/verify/",
          buttonValue: "Verify",
        });

        try {
          await sendMailWithNodemailer(
            registeredUser.email,
            "Verify your email",
            template
          );
          msg += "Verification email sent";
        } catch (error) {
          msg += " Failed to send verification email.";
        }
      } else {
        msg = "Failed to register the user.";
      }
      console.log("User created");
    } catch (error) {
      console.log("User not created");
    }
  } else {
    msg = `User already exist with ${username} or ${email}`;
  }
  return { registeredUser, msg };
}

export async function getUserByVerifyTokenAndVerified(verifyToken, verified) {
  if (verifyToken && verified !== undefined) {
    const user = await prisma.user.findFirst({
      where: {
        verifyToken: verifyToken,
        verified: verified,
        verifyTokenExpire: {
          gt: new Date(),
        },
      },
    });
    console.log("DbGetUser", user);
    return user;
  }
  return undefined;
}

export async function updateVerifiedByVerifyToken(verifyToken) {
  if (
    verifyToken &&
    (await getUserByVerifyTokenAndVerified(verifyToken, false))
  ) {
    const data = await prisma.user.update({
      where: {
        verifyToken: verifyToken,
        verifyTokenExpire: {
          gt: new Date(),
        },
        verified: false,
      },
      data: {
        verified: true,
        verifyTokenExpire: new Date(),
      },
    });

    console.log("DbUpdateUser", data);
    return data;
  }
  return undefined;
}

export async function getUserByEmail(email) {
  if (email) {
    const data = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

export async function getUserByUsername(username) {
  if (username) {
    const data = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

export async function getUserBySessionId(id) {
  if (id) {
    const data = await prisma.user.findUnique({
      where: {
        sessionId: id,
      },
    });
    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

export async function insertSessionIdByEmail(email) {
  let sessionId = null;
  let message = "Logged in Fail";
  if (email) {
    try {
      const user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          sessionId: generateToken(),
        },
      });
      if (user) {
        sessionId = user.sessionId;
        message = `Logged in successfully as ${user.username}`;
      }
    } catch (error) {
      message = "Internal Server Error";
    }
  }
  return { sessionId, message };
}
