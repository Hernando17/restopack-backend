const {
  getAllUser,
  userRegister,
  // updateUser,
  // deleteUser,
  getUserById,
  userLogin,
} = require("../controllers/authController.js");
const { tokenAuthenticate } = require("../middlewares/tokenAuthentication");
const express = require("express");
const router = express.Router();
const url = `api/${process.env.VERSION}`;

router.get(`/${url}/user/:id`, tokenAuthenticate, getUserById);
router.get(`/${url}/userlist`, tokenAuthenticate, getAllUser);
router.post(`/${url}/login`, userLogin);
router.post(`/${url}/register`, userRegister);
// router.patch("/updateuser/:id", updateUser);
// router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
