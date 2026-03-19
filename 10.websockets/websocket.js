const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const WebsocketServer = require("websocket").server;

const port = 8080;

// Create an HTTP server
// const httpServer = http.createServer((req, res) => {
//   if (req.url === "/chat") {
//     // Serve the index.html file
//     res.writeHead(200, { "Content-Type": "text/html" });
//     const chatHtml = fs.readFileSync(path.join(__dirname, "index.html"));
//     res.end(chatHtml);
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Not found");
//   }
// });

// Create an Express server
const app = express();
app.use(express.static(path.join(__dirname, "public")));
const httpServer = http.createServer(app);
httpServer.on("request", (req, res) => {
  if (req.url === "/chat") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const chatHtml = fs.readFileSync(path.join(__dirname, "index.html"));
    res.end(chatHtml);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

// Create a WebSocket server
const wsServer = new WebsocketServer({
  httpServer: httpServer,
  autoAcceptConnections: false,
});

let connections = [];

wsServer.on("request", (request) => {
  // Accept the local connection
  const RequestOrigin = request.accept(null, request.origin);
  const hosterWs = "http://localhost:8080";
  //you are an outsider
  if (RequestOrigin !== hosterWs) {
    request.reject();
    console.log(`Connection from origin ${request.origin} rejected.`);
    return;
  }
  // Accept the connection and add it to the list of connections
  connections.push(RequestOrigin);
  console.log("New WebSocket connection accepted", connections.length);

  //notify other connections
  connections.forEach((connection) => {
    //it will notify other connections except the one who just connected
    if (connection !== RequestOrigin) {
      connection.sendUTF(
        `New user connected. Total connections: ${connections.length}`,
      );
    }
  });

  const uniqueIdentifier =
    RequestOrigin.socket.remoteAddress + ":" + RequestOrigin.socket.remotePort;
  console.log(`Unique Identifier for the connection: ${uniqueIdentifier}`);

  //hear for message
  RequestOrigin.on("message", (message) => {
    connections.forEach((connection) => {
      //it will send the message to all connections except the one who sent the message
      if (connection !== RequestOrigin) {
        connection.sendUTF(`User ${uniqueIdentifier}: ` + message.utf8Data);
      }
    });
    console.log("Received message:", message.utf8Data);
  });

  // Handle connection close
  RequestOrigin.on("close", () => {
    connections = connections.filter((conn) => conn !== RequestOrigin);
    console.log("WebSocket connection closed", connections.length);
  });
});
httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
