const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mern-2-local");

// Define schemas
const AdminSchema = new mongoose.Schema(
  {
    // Schema definition here
    username: String,
    password: String,
    token: String,
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    // Schema definition here
    username: String,
    password: String,
    token: String,
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const CourseSchema = new mongoose.Schema(
  {
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    imageLink: String,
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
