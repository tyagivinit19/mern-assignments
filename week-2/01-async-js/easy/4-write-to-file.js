const fs = require("fs");

const writeFile = () => {
  fs.readFile("easy/testFile.txt", "utf-8", (err, fileData) => {
    console.log(fileData);
  });
  fs.truncate("easy/testFile.txt", 0, function () {
    console.log("Truncate Done");
  });
  fs.writeFile("easy/testFile.txt", "test File", function () {
    console.log("Writing done");
  });
  fs.readFile("easy/testFile.txt", "utf-8", (err, fileData) => {
    console.log(fileData);
  });
};

writeFile();
