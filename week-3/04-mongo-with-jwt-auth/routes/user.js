const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

const jwt = require("jsonwebtoken");
const jwtPassword = "secret";

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  // console.log('hey')
  let hashedPass = await bcrypt.hash(req.body.password, 10);
  await User.create({
    username: req.body.username,
    password: hashedPass,
  });

  res.json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  let username = req.body.username;
  let password = req.body.password;

  let user = await User.findOne({ username: username }).exec();
  if (!user) {
    return res.json("User not found");
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

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  let result = await Course.find({}, "_id title description imageLink price");
  res.json(result);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic

  let id = req.params.courseId;
  // console.log(id);
  let course = await Course.findById(id);

  if (!course) {
    return res.json({ message: "Course does not exists" });
  }

  let username = req.user.username;

  let user = await User.findOne({ username: username }).exec();

  await User.findByIdAndUpdate(user._id, { $push: { courses: course._id } });

  res.json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  let username = req.user.username;

  let user = await User.findOne({ username: username }).exec();

  let result = await User.aggregate([
    { $match: { _id: user._id } },
    {
      $lookup: {
        from: "courses",
        localField: "courses",
        foreignField: "_id",
        as: "courses",
      },
    },
  ]).exec();

  let userCourses = result[0].courses;

  const outputArray = userCourses.map((course) => ({
    id: course._id,
    title: course.title,
    description: course.description,
    price: course.price,
    imageLink: course.imageLink,
  }));

  console.log(outputArray);

  res.json({ purchasedCourses: outputArray });
});

module.exports = router;
