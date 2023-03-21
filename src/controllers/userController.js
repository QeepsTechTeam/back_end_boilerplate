// importing user context
const {withErrorHandler} = require('../error/httpError')
const UserService = require('../services/userService')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userService = new UserService(User)

const register = withErrorHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const user = userService.register({ first_name, last_name, email, password })
  return user;

});


const login = withErrorHandler(async (req, res) => {
    // Our login logic starts here
    // Get user input
    const { email, password } = req.body;

    const user = userService.login({ email, password })
    return user;

});


module.exports = {
    register,
    login,
}