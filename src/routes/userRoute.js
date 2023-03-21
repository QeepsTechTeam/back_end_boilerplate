const express = require('express')

const router = express.Router()

const userController = require('../controllers/userController')
const auth = require("../middleware/auth");

// Register
router.post("/register", auth.verifyMainToken, userController.register)

// Login
router.post("/login", userController.login)

module.exports = router
