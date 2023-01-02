const {
    getAllUser,
    userRegister,
    // updateUser,
    // deleteUser,
    userLogin,
} = require("../controllers/authController.js");
const {tokenAuthenticate} = require("../middlewares/tokenAuthentication")
const express = require("express");

const router = express.Router();

router.get("/userlist", tokenAuthenticate, getAllUser);
router.post("/login", userLogin);
router.post("/register", userRegister);
// router.patch("/updateuser/:id", updateUser);
// router.delete("/deleteuser/:id", deleteUser);


module.exports = router;
