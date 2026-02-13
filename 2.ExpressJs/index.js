const express= require('express');
const server =  express();

const PORT = 8089;

server.get('/',(req,res)=>{
    res.send('it just test my express server');
});

//get all the users
/** 
 * use nouns not verbs for the endpoint
 * /users not /getUsers
 * /users/:id not /getUserById
 * /users/:id/posts not /getPostsByUserId
 * 
 * use query parameters for filtering and sorting
 * /users?age=30&sort=asc
 * /users?name=John
 * /users?age=30&name=John
 * 
 * use request body for creating and updating resources
 * POST /users
 * PUT /users/:id
 * PATCH /users/:id
 * 
 * use status codes to indicate the result of the request
 * 200 OK for successful GET, PUT, PATCH, DELETE requests
 * 201 Created for successful POST requests
 * 204 No Content for successful DELETE requests
 * 400 Bad Request for invalid requests
 * 404 Not Found for non-existent resources
 * 500 Internal Server Error for server errors
 */

//query parameters example
server.get('/users',(req,res)=>{
    const age = req.query.age;
    const name = req.query.name;
    res.send(`you are looking for users with age ${age} and name ${name}`);
});

server.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});
