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
  try {
    const register = await prisma.user
      .create({
        data: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          isRestaurant: req.body.isRestaurant,
          isWaitress: req.body.isWaitress,
          created_at: req.body.created_at,
          updated_at: req.body.updated_at,
          deleted_at: req.body.deleted_at,
        },
      })
      .then(function () {
        res.status(201).json({
          message: "success",
        });
      });
  } catch (e) {
    next(e);
  }
}

module.exports = { userlist, registerUser };
