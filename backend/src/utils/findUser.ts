import prisma from "../DB/DB.js";

async function findUser(email: string) {
  const user = prisma.user.findUnique({
    where: { email },
  });
  return user;
}

export default findUser;
