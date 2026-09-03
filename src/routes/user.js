//user ROUTER
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyAdminToken } = require("../middlewares/token");

router.post("/signup", userController.signUp);

router.post("/signin", userController.signIn);

router.get("/getall", verifyAdminToken, userController.getAllUsers);

module.exports = router;
