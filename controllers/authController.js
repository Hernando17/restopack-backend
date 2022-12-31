const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function userlist(req, res, next) {
  try {
    const users = await prisma.user.findMany();
    if (users.length == 0) {
      return res.status(404).send({
        message: "No user found",
      });
    } else {
      return res.json(users);
    }
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
        res.status(201).send({
          head: "Success",
          message: "User registration success",
        });
      });
  } catch (e) {
    next(e);
  }
}

async function updateUser(req, res, next) {
  try {
    const update = await prisma.user
      .update({
        where: {
          id: Number(req.params.id),
        },
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
        res.status(200).json({
          message: "User has been updated",
        });
      });
  } catch (e) {
    next(e);
  }
}

async function deleteUser(req, res, next) {
  try {
    const userCheck = await prisma.user
      .findUnique({
        where: {
          id: Number(req.params.id),
        },
      })
      .then(function (response) {
        if (!response) {
          return res.status(404).json({
            message: "User not found",
          });
        }
      });

    const deleteUser = await prisma.user
      .delete({
        where: {
          id: Number(req.params.id),
        },
      })
      .then(function () {
        res.status(200).json({
          message: "User has been deleted",
        });
      });
  } catch (e) {}
}

module.exports = { userlist, registerUser, updateUser, deleteUser };
