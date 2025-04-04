const express = require("express");
const app = express();
const cors=require("cors");
const User = require("./userModal");
// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let botCount = 0;
let threates = 0;

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// Store user data temporarily for passing to dashboard
let tempUserData = {};

app.post("/createuser", async (req, res) => {
  await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  // Store user details in tempUserData
  tempUserData = {
    username: req.body.username,
    email: req.body.email,
  };

  res.render("pricing");
});

// Move the /dashboard route outside of /createuser
app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    user: tempUserData.username,
    email: tempUserData.email,
    count: botCount,
    threat: threates,
  });
});

app.post("/check", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("User not found! Please sign up.");
    }

    // Compare passwords (assuming plain text, but hashing is recommended)
    if (user.password !== password) {
      return res.status(401).send("Incorrect password! Try again.");
    }

    // Store user details in tempUserData
    tempUserData = {
      username: user.username,
      email: user.email,
    };

    // If email and password match, render the dashboard page
    res.render("dashboard", {
      user: user.username,
      email: user.email,
      count: botCount,
      threat: threates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error! Please try again.");
  }
});

app.post("/update", (req, res) => {
  botCount++;
  threates++;
  res.send("Updated bot count and threats.");
  res.redirect("/dashboard");
});

// Start the server
app.listen(8500, () => {
  console.log("Localhost 8500 is running");
});








































