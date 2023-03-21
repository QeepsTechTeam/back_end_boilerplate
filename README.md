# back_end_boilerplate
Create your backend and deploy it to cloud run.

### STEPS

1. Create server.js at the root 

```bash
# Create project 
mkdir app/src
cd app 
npm init
Create src/server.js 

npm install -y

# Install express 
npm install express

# Install dotenv
sudo npm install dotenv

# Install mongoose
sudo npm install mongoose

# Install bcryptjs
sudo npm install bcryptjs

# Install jwt
sudo npm install jsonwebtoken

# Install nodemon
sudo npm install nodemon

# Install swagger 
sudo npm install swagger-ui-express

```

1. Create 
    1. middleware (auth)
    2. models(mongoose)
    3. controllers
    4. routes

1. Use post man to check the request 
2. Use mongodb cloud for the db 
3. Create .env to store the secrets..

```bash
# Run the app localy 
npm run dev
```

## [Architecture]
<img width="723" alt="Capture d’écran 2023-03-21 à 14 10 28" src="https://user-images.githubusercontent.com/92106469/226616018-669b9154-05c5-4eb2-bb93-263884873403.png">

