const express= require('express');
const { homePageResponse } = require('./controllers/HomeController');
const homeRoutes = require('./routes/HomeRoutes');
const router = require('./routes/coursesRoutes');
const server =  express();

//common middlewares
server.use(express.json());


const PORT = 8089;

// server.get('/', homePageResponse);

// server.get('/home',homePageResponse);

server.use('/', homeRoutes);
server.use('/home', homeRoutes);
server.use('/about', homeRoutes);



server.get("/users", (req, res) => {
  const age = req.query.age;
  const name = req.query.name;
  res.send(`you are looking for users with age ${age} and name ${name}`);
});

server.use('/courses', router);

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
