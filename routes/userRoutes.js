const {
  getAllUser,
  getUserById,
  updateUserInformation,
} = require("../controllers/userController.js");
const { tokenAuthenticate } = require("../middlewares/tokenAuthentication");
const express = require("express");
const router = express.Router();
const url = `api/${process.env.VERSION}`;

router.get(`/${url}/user/:id`, tokenAuthenticate, getUserById);
router.get(`/${url}/userlist`, tokenAuthenticate, getAllUser);
router.patch(
  `/${url}/updateuserinformation/:id`,
  tokenAuthenticate,
  updateUserInformation
);
// router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
