// File Input/Output Operations
const fs = require("fs");
// Reading from a file
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File contents:", data);
});
// Writing to a file
const content = "This is some sample content to write to the file.";
fs.writeFile("output.txt", content, (err) => {
  if (err) {
    console.error("Error writing to file:", err);
    return;
  }
  console.log("File has been written successfully.");
});
// Appending to a file
const additionalContent =
  "\nThis is some additional content to append to the file.";
fs.appendFile("output.txt", additionalContent, (err) => {
  if (err) {
    console.error("Error appending to file:", err);
    return;
  }
  console.log("Content has been appended successfully.");
});
