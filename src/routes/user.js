//user ROUTER
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.post("/signup", userController.signUp);

router.get("/getall", userController.getAllUsers);

module.exports = router;
