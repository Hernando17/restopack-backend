const { userlist, registerUser } = require("../controllers/authController.js");
const express = require("express");
const app = express();
const port = 3000;

const router = express.Router();

router.get("/userlist", userlist);
router.post("/register", registerUser);

module.exports = router;
