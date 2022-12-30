const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function userlist(req, res, next) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function registerUser(req, res, next) {
  const register = await prisma.user.create({
    data: {
      username: "test",
      email: "test@email.com",
      password: "test123",
      isRestaurant: true,
      isWaitress: false,
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
  });
}

module.exports = { userlist, registerUser };
