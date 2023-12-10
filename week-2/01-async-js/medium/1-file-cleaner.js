const fs = require("fs");

const cleanFile = async () => {
  fs.readFile("medium/testFile.txt", "utf-8", (err, fileData) => {
    console.log(fileData);
    let newData = fileData.replace(/\s+/g, " ").trim();

    fs.writeFile("medium/testFile.txt", newData, function () {
      console.log("Writing done");
      fs.readFile("medium/testFile.txt", "utf-8", (err, fileData) => {
        console.log(fileData);
      });
    });
  });
};

cleanFile();
