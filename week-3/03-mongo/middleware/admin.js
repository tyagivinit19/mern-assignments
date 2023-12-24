const bcrypt = require("bcrypt")
const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let username = req.headers.username;
    let password = req.headers.password;

    let user = await Admin.findOne({username: username}).exec();
    if (!user) {
        return res.json('Admin not found')
    }

    let result = await bcrypt.compare(password, user.password);
    if (result) {
        next();
    } else {
        res.json("Password didn't match")
    }
}

module.exports = adminMiddleware;