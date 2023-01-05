const { tokenAuthenticate } = require("../middlewares/tokenAuthentication");
const {
  showAllTables,
  createTable,
  deleteTable,
} = require("../controllers/tableController");
const express = require("express");
const router = express.Router();

router.get("/showalltable", tokenAuthenticate, showAllTables);
router.post("/createtable", tokenAuthenticate, createTable);
router.delete("/deletetable/:id", tokenAuthenticate, deleteTable);

module.exports = router;
