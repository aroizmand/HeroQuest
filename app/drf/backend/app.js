require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoUrl = process.env.API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

require("./schemas/UserDetails");
const User = mongoose.model("User");

app.get("/", (req, res) => {
  res.send({ status: "started" });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const oldUserEmail = await User.findOne({ email: email });
  const oldUserUser = await User.findOne({ username: username });
  if (oldUserUser || oldUserEmail) {
    if (oldUserUser && oldUserEmail) {
      return res.send({
        status: "user and email taken",
        data: "user and email taken",
      });
    } else if (oldUserUser && !oldUserEmail) {
      return res.send({ status: "user taken", data: "user taken" });
    } else if (!oldUserUser && oldUserEmail) {
      return res.send({ status: "email taken", data: "email taken" });
    }
  }

  // Proceed with user creation if username and email are unique
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      username,
      email,
      password: encryptedPassword,
    });
    res
      .status(201)
      .send({ status: "ok", message: "User created successfully" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "An error occurred during user registration",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        status: "error",
        code: "USER_NOT_FOUND",
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        status: "error",
        code: "INVALID_CREDENTIALS",
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    return res.send({ status: "ok", data: token });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .send({ status: "error", message: "An internal server error occurred." });
  }
});

app.post("/userdata", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ status: "error", message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const useremail = decoded.email;

    User.findOne({ email: useremail }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ status: "error", message: "User not found" });
      }
      const userDetails = {
        username: user.username,
        email: user.email,
      };
      return res.send({ status: "ok", data: userDetails });
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(401)
      .send({ status: "error", message: "Invalid or expired token" });
  }
});

app.post("/distribute-points", async (req, res) => {
  const { username, attributes } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const totalPoints = Object.values(attributes).reduce(
      (acc, val) => acc + val,
      0
    );
    if (totalPoints > user.totalPoints) {
      return res.status(400).send("Total points exceed available points");
    }

    user.attributes = attributes;
    user.totalPoints -= totalPoints;
    await user.save();

    res.status(200).send("Points distributed successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(5001, () => {
  console.log("Server Started");
});
