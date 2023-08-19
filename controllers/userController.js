const { Users } = require("../models");

async function getAllUser(req, res, next) {
  try {
    await Users.findAll().then(async function (user) {
      return res.status(200).json({
        user: user,
      });
    });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  const { id } = req.params;

  try {
    await Users.findOne({
      where: {
        id: parseInt(id),
      },
    }).then(async function (user) {
      if (user) {
        return res.status(200).json({
          name: user.name,
          email: user.email,
          isRestaurant: true,
        });
      } else {
        return res.status(404).json({
          head: "Failed",
          message: "User not found",
        });
      }
    });
  } catch (error) {
    next(error);
  }
}

async function updateUserInformation(req, res, next) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await Users.update(
      {
        name: name,
      },
      {
        where: {
          id: parseInt(id),
        },
      }
    ).then(async function (user) {
      if (user) {
        return res.status(200).json({
          head: "Success",
          message: "User updated",
        });
      } else {
        return res.status(404).json({
          head: "Failed",
          message: "User not found",
        });
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUser, getUserById, updateUserInformation };
