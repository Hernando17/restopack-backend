const { tokenAuthenticate } = require("../middlewares/tokenAuthentication");
const {
  showAllTables,
  createTable,
  deleteTable,
} = require("../controllers/tableController");
const express = require("express");
const router = express.Router();
const url = `api/${process.env.VERSION}`;

router.get(`/${url}/showalltable`, tokenAuthenticate, showAllTables);
router.post(`/${url}/createtable`, tokenAuthenticate, createTable);
router.delete(`/${url}/deletetable/:id`, tokenAuthenticate, deleteTable);

module.exports = router;
