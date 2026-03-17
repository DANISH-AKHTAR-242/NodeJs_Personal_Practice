//backpressure is a mechanism that allows a writable stream to signal to a readable stream that it is overwhelmed and cannot handle more data at the moment. This helps prevent memory overflow and ensures that the writable stream can process data at its own pace without being overwhelmed by the readable stream.
//When a writable stream is overwhelmed, it will emit a 'drain' event when it is ready to receive more data. The readable stream can listen for this event and resume sending data when the writable stream is ready.
const fs = require("fs");
const readableStream = fs.createReadStream("input.txt");
const writableStream = fs.createWriteStream("output.txt");
readableStream.on("data", (chunk) => {
  if (!writableStream.write(chunk)) {
    // If the writable stream is overwhelmed, pause the readable stream
    readableStream.pause();
  }
});
writableStream.on("drain", () => {
  // When the writable stream is ready to receive more data, resume the readable stream
  readableStream.resume();
});
