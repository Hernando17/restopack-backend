const sequelize = require("sequelize");
const Model = require("../models");

async function getAllUser(req, res) {
  const getUser = await Model.User.findAll().then(function (response) {
    return res.json(response);
  });
}

module.exports = { getAllUser };
