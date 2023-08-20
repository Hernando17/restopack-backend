const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Users } = require("../models");

async function userRegister(req, res, next) {
    try {
        const { name, email, password, confirm_password, isRestaurant } =
            req.body;

        Users.findOne({
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

        if (password !== confirm_password) {
            return res
                .status(400)
                .json({ head: "Failed", message: "Password doesn't match" });
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);

        await Users.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt),
            isRestaurant,
        }).then(function () {
            return res.status(201).send({
                head: "Success",
                message: "User registration successfully",
            });
        });
    } catch (error) {
        next(error);
    }
}

async function userLogin(req, res, next) {
    const { email, password } = req.body;

    try {
        Users.findOne({
            where: {
                email,
            },
        }).then(function (user) {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    const token = jwt.sign(
                        {
                            username: user.username,
                            email: user.email,
                        },
                        process.env.SECRET,
                        { expiresIn: "1d" }
                    );

                    const refreshToken = jwt.sign(
                        {
                            username: user.username,
                            email: user.email,
                        },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: "30d" }
                    );

                    if (result) {
                        return res.status(200).json({
                            head: "Success",
                            message: "User login successfully",
                            user: {
                                id: user.id,
                                username: user.username,
                                email: user.email,
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

module.exports = { userRegister, userLogin };
