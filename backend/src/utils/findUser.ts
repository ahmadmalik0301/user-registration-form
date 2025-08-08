import prisma from "../DB/DB.js";

async function getUser(email: string) {
  const user = prisma.user.findUnique({
    where: { email },
  });
  return user;
}

export default getUser;
