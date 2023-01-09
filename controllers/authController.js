const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Restaurant, Waitress } = require("../models");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

async function getAllUser(req, res, next) {
  try {
    const getRestaurant = await Restaurant.findAll().then(async function (
      response
    ) {
      const getWaitress = await Waitress.findAll().then(function (response2) {
        return res.status(200).json({
          restaurant: response,
          waitress: response2,
        });
      });
    });
  } catch (error) {
    next(error);
  }
}

async function userRegister(req, res, next) {
  try {
    const { username, email, password, confirm_password, isRestaurant } =
      req.body;

    const checkEmail = Restaurant.findOne({
      where: {
        email,
      },
    }).then((response) => {
      if (response) {
        return res.status(409).json({
          head: "Failed",
          message: "Email has been used",
        });
      }
    });

    const checkEmail2 = Waitress.findOne({
      where: {
        email,
      },
    }).then((response2) => {
      if (response2) {
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

    if (isRestaurant) {
      const createUser = await Restaurant.create({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
      }).then(function () {
        return res
          .status(201)
          .send({ head: "Success", message: "User registration successfully" });
      });
    } else {
      const createUser = await Waitress.create({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
      }).then(function () {
        return res
          .status(201)
          .send({ head: "Success", message: "User registration successfully" });
      });
    }
  } catch (error) {
    next(error);
  }
}

async function userLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const checkRestaurant = Restaurant.findOne({
      where: {
        email,
      },
    }).then(function (response) {
      if (!response) {
        const checkWaitress = Waitress.findOne({
          where: {
            email,
          },
        }).then(function (response2) {
          if (!response2) {
            return res.status(404).send({
              head: "Failed",
              message: "User not found",
            });
          }

          const checkPassword = bcrypt.compare(
            password,
            response2.password,
            function (err, result) {
              const token = jwt.sign(
                {
                  username: response2.username,
                  email: response2.email,
                },
                process.env.SECRET,
                { expiresIn: "1d" }
              );

              const refreshToken = jwt.sign(
                {
                  username: response2.username,
                  email: response2.email,
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "30d" }
              );

              if (result) {
                return res.status(200).json({
                  head: "Success",
                  message: "User login successfully",
                  user: {
                    id: response2.id,
                    username: response2.username,
                    email: response2.email,
                    isRestaurant: false,
                  },
                  token,
                  refreshToken,
                });
              } else {
                return res.status(403).json({
                  head: "Failed",
                  message: "Wrong password",
                });
              }
            }
          );
        });
      } else {
        const checkPassword = bcrypt.compare(
          password,
          response.password,
          function (err, result) {
            const token = jwt.sign(
              {
                username: response.username,
                email: response.email,
              },
              process.env.SECRET,
              { expiresIn: "1d" }
            );

            const refreshToken = jwt.sign(
              {
                username: response.username,
                email: response.email,
              },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "30d" }
            );

            if (result) {
              return res.status(200).json({
                head: "Success",
                message: "User login successfully",
                user: {
                  id: response.id,
                  username: response.username,
                  email: response.email,
                  isRestaurant: true,
                },
                token,
                refreshToken,
              });
            } else {
              return res.status(403).json({
                head: "Failed",
                message: "Wrong password",
              });
            }
          }
        );
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUser, userRegister, userLogin };
