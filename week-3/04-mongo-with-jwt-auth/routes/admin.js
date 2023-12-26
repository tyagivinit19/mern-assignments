const { Router } = require("express");
const bcrypt = require("bcrypt");
const adminMiddleware = require("../middleware/admin");
const { User, Admin, Course } = require("../db");
const router = Router();

const jwt = require("jsonwebtoken");
const jwtPassword = "secret";

// Admin Routes
router.post("/signup", async (req, res) => {
  let hashedPass = await bcrypt.hash(req.body.password, 10);
  await Admin.create({
    username: req.body.username,
    password: hashedPass,
  });

  res.json({ message: "Admin created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic

  let username = req.body.username;
  let password = req.body.password;

  let user = await Admin.findOne({ username: username }).exec();
  if (!user) {
    return res.json("Admin not found");
  }
  // console.log(password);
  // console.log(user.password);

  let result = await bcrypt.compare(password, user.password);
  // console.log(result);
  if (!result) {
    return res.json("Password didn't match");
  }

  let token = jwt.sign({ username, password }, jwtPassword);

  // await Admin.updateOne({_id: user._id}, {token})

  return res.json({ token });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let imageLink = req.body.imageLink;

  let result = await Course.create({ title, description, price, imageLink });

  res.json({ message: "Course created successfully", courseId: result._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  let result = await Course.find({}, "_id title description imageLink price");
  res.json(result);
});

module.exports = router;
