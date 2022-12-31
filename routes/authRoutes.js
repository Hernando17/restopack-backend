const {
  getAllUser,
  userRegister,
  // updateUser,
  // deleteUser,
  userLogin,
} = require("../controllers/authController.js");
const express = require("express");
const app = express();
const port = 3000;

const router = express.Router();

router.get("/userlist", getAllUser);
router.post("/register", userRegister);
// router.patch("/updateuser/:id", updateUser);
// router.delete("/deleteuser/:id", deleteUser);
router.post("/login", userLogin);

module.exports = router;
