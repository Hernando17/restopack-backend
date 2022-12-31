const sequelize = require("sequelize");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

async function getAllUser(req, res, next) {
  try {
    const getUser = await User.findAll().then(function (response) {
      return res.status(200).json(response);
    });
  } catch (error) {
    next(error);
  }
}

async function userRegister(req, res, next) {
  try {
    const {
      username,
      email,
      password,
      confirm_password,
      isRestaurant,
      isWaitress,
    } = req.body;

    const checkEmail = User.findAll({
      where: {
        email,
      },
    }).then((response) => {
      if (response.length > 0) {
        return res.status(409).json({
          head: "Failed",
          message: "Email has been used",
        });
      }
    });

    if (password !== confirm_password) {
      return res
        .status(400)
        .json({ head: "Failed", message: "Password doesn't match" });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    const createUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
      isRestaurant,
      isWaitress,
    }).then(function () {
      return res
        .status(201)
        .send({ head: "Success", message: "User registration successfully" });
    });
  } catch (error) {
    next(error);
  }
}

async function userLogin(req, res, next) {
  try {
    const checkUser = User.findOne({
      where: {
        email: req.body.email,
      },
    }).then(function (response) {
      if (response) {
        const password = bcrypt.compare(
          req.body.password,
          response.password,
          function (err, result) {
            const token =
              "Bearer " +
              jwt.sign(
                {
                  data: response.id,
                },
                "secret",
                { expiresIn: "24h" }
              );
            if (result) {
              return res.status(200).json({
                head: "Success",
                message: "User login successfully",
                token: token,
              });
            } else {
              return res.status(403).json({
                head: "Failed",
                message: "Wrong password",
              });
            }
          }
        );
      } else {
        return res
          .status(404)
          .json({ head: "Failed", message: "User not found" });
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUser, userRegister, userLogin };
