const http = require('node:http');
const port = 6000;

const server = http.createServer((req, res) => {
    res.write("hello this is nice");
    res.end();
});

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});