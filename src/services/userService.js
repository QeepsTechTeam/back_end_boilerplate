// importing user context
const { HTTPError } = require('../error/httpError')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


class UserService {
  constructor(model){
    this.model = model
}
  async register({ first_name, last_name, email, password }) {
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          throw new HTTPError("All input is required", 400);
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await this.model.findOne({ email });
    
        if (oldUser) {
          throw new HTTPError("User Already Exist. Please Login", 409);
        }
    
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await this.model.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "48h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        return user;
      // Our register logic ends here
  }


  async login({ email, password }) {
      // Validate user input
      if (!(email && password)) {
          throw new HTTPError("All input is required", 400); 
      }
      // Validate if user exist in our database
      const user = await this.model.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
          expiresIn: "48h",
          }
      );

      // save user token
      user.token = token;
      
      // user
      return user;
      }
      else {
          throw new HTTPError("Invalid Credentials", 400);
      }
      // Our register logic ends here
  }

}

module.exports = UserService