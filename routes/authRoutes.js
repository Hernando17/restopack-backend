const {
  getAllUser,
  // registerUser,
  // updateUser,
  // deleteUser,
} = require("../controllers/authController.js");
const express = require("express");
const app = express();
const port = 3000;

const router = express.Router();

router.get("/userlist", getAllUser);
// router.post("/register", registerUser);
// router.patch("/updateuser/:id", updateUser);
// router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
