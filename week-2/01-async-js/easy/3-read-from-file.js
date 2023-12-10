const fs = require("fs");

const readFile = () => {
    fs.readFile('easy/testFile.txt', 'utf-8', (err, fileData) => {
        console.log(fileData)
    })
}

readFile()