//-----Streams--------
//Streams are a powerful concept in Node.js that allow you to read and write data in a continuous flow. They are particularly useful for handling large files or data that is generated over time, such as user input or network requests.

//Behind The Streams: Buffers, Pipes, and Events

//There are four types of streams in Node.js: Readable, Writable, Duplex, and Transform. Each type of stream has its own set of methods and events that you can use to manipulate the data.

//-------Readable streams ----------are used to read data from a source, such as a file or a network connection. They emit 'data' events when new data is available and 'end' events when there is no more data to read.

const fs = require("fs");
const readableStream = fs.createReadStream("input.txt");
readableStream.on("data", (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});
readableStream.on("end", () => {
  console.log("No more data to read.");
});

//-------Writable streams ----------are used to write data to a destination, such as a file or a network connection. They emit 'drain' events when the buffer is empty and 'finish' events when all data has been written.

const writableStream = fs.createWriteStream("output.txt");
writableStream.write("Hello, World!\n");
writableStream.write("This is a writable stream example.\n");
writableStream.end();

//-------Pipes ----------are a convenient way to connect a readable stream to a writable stream. They allow you to easily transfer data from one stream to another without having to manually handle the 'data' events.
const sourceStream = fs.createReadStream("input.txt");
const destinationStream = fs.createWriteStream("output.txt");
sourceStream.pipe(destinationStream);

//problem with pipe is that it does not handle errors by default. If an error occurs in the source stream, it will not be propagated to the destination stream, which can lead to data loss or corruption. To handle errors when using pipes, you should listen for 'error' events on both the source and destination streams and handle them appropriately.
sourceStream.on("error", (err) => {
  console.error("Error in source stream:", err);
});
destinationStream.on("error", (err) => {
  console.error("Error in destination stream:", err);
});

//-------Duplex streams ----------are both readable and writable, allowing you to read and write data simultaneously. They emit events for both reading and writing operations.
const duplexStream = new require("stream").Duplex();
duplexStream._read = function (size) {
  // Implement your reading logic here
};
duplexStream._write = function (chunk, encoding, callback) {
  // Implement your writing logic here
  callback();
};

//-------Transform streams ----------   are a type of duplex stream that allows you to modify the data as it is being read or written. They emit events for both reading and writing operations, as well as 'transform' events when the data is being modified.
const transformStream = new require("stream").Transform();
transformStream._transform = function (chunk, encoding, callback) {
  // Implement your transformation logic here
  const transformedChunk = chunk.toString().toUpperCase(); // Example transformation
  this.push(transformedChunk);
  callback();
};

// diffrence between paused and flowing mode
// In paused mode, the stream will not emit 'data' events until you explicitly call the .resume() method. This allows you to control when data is read from the stream. In flowing mode, the stream will automatically emit 'data' events as soon as data is available, without waiting for any explicit calls. You can switch between paused and flowing modes using the .pause() and .resume() methods on the stream.
