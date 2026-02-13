const express = require('express');
const { authMiddleware } = require('./middleware/authMiddleware');
const { login, register } = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const server = express();
require('dotenv').config();//common middlewares server.use(express.json()); const PORT = 8089; //connect to database mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => { console.log('connected to database'); }).catch((err) => { console.log('error connecting to database', err); });

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI).then(() => 
    {console.log('connected to database'); }).catch((err) => 
        { console.log('error connecting to database', err); }); 
    server.use(express.json());

server.listen(PORT, () => {
console.log(`server is running on http://localhost:${PORT}`);
});




server.use('/login', login);
server.use('/register', register);