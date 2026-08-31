//user ROUTER
const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")


//signup endpoint  ("/user/signup")
router.post("/signup" , userController.signUp )



module.exports = router;