const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware for handling auth
async function userMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Token is missing" });
  }
  //   console.log(token)

  token = token.replace("Bearer ", "");

  try {
    let decoded = jwt.verify(token, "secret");

    // console.log(decoded);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Token is invalid" });
  }
}

module.exports = userMiddleware;
