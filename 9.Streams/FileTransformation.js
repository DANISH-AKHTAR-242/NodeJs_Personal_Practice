//file transformation using streams
const fs = require("fs");
//zlib is a built-in module in Node.js that provides compression and decompression functionality. It allows you to compress data using various algorithms, such as gzip and deflate, and also to decompress data that has been compressed using these algorithms. In the context of file transformation, zlib can be used to compress or decompress files as they are being read or written using streams. This can help reduce the size of the files and improve performance when transferring or storing them.
const zlib = require("zlib");
const readableStream = fs.createReadStream("input.txt");
const writableStream = fs.createWriteStream("output.txt.gz");
const gzip = zlib.createGzip();
readableStream.pipe(gzip).pipe(writableStream);
// In this example, we are reading data from "input.txt", compressing it using gzip, and then writing the compressed data to "output.txt.gz". The pipe() method is used to connect the readable stream to the gzip transform stream and then to the writable stream. This allows for efficient data transformation without having to load the entire file into memory at once.

    