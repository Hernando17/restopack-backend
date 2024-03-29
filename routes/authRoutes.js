const { userRegister, userLogin } = require("../controllers/authController.js");
const { tokenAuthenticate } = require("../middlewares/tokenAuthentication");
const express = require("express");
const router = express.Router();
const url = `api/${process.env.VERSION}`;

router.post(`/${url}/login`, userLogin);
router.post(`/${url}/register`, userRegister);
// router.patch("/updateuser/:id", updateUser);
// router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
