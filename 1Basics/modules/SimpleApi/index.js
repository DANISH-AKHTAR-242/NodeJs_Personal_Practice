const http = require('node:http');
const port = 8089;

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === "/") {
        res.end("welcome to home page");
    } else if (url === "/about") {
        res.end("welcome to about page");
    }
});

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});