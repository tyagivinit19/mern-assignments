const bcrypt = require("bcrypt")
const { User } = require("../db");

async function userMiddleware (req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    let username = req.headers.username;
    let password = req.headers.password;

    let user = await User.findOne({username: username}).exec();
    if (!user) {
        return res.json('User not found')
    }

    let result = await bcrypt.compare(password, user.password);
    if (result) {
        next();
    } else {
        res.json("Password didn't match")
    }
}

module.exports = userMiddleware;