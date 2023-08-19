const sequelize = require("sequelize");
const { Table } = require("../models");

async function showAllTables(req, res, next) {
  try {
    const showAll = await Table.findAll();

    return res.status(200).json(showAll);
  } catch (error) {
    next(error);
  }
}

async function createTable(req, res, next) {
  try {
    const { number } = req.body;

    if (!number || !Number.isInteger(number)) {
      return res.status(400).json({
        message: "Please provide a number",
      });
    }

    const createTable = await Table.create({
      number,
    }).then(function () {
      return res.status(201).json({
        head: "Success",
        message: "Table created successfully",
      });
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTable(req, res, next) {
  try {
    const { id } = req.params;

    const findTable = Table.findOne({
      where: {
        id: parseInt(id),
      },
    }).then(function (response) {
      if (!response || response.deletedAt) {
        return res.status(404).json({
          message: "Table not found",
        });
      }
    });

    const deleteTable = await Table.destroy({
      where: {
        id: parseInt(id),
      },
    }).then(function () {
      return res.status(200).json({
        head: "Success",
        message: "Table deleted successfully",
      });
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { showAllTables, createTable, deleteTable };
