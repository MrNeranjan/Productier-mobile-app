const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://Neranjan:wbc1PDdUyXJESHO2@cluster0.lqsvzrn.mongodb.net/NoteKeeper",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server is running on port 3000");
});





// end point for user registration
const User = require("./schemas/userRegDetails");
app.post("/UserRegister", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "You have already registered.If you want register again please use another email." });
    }

    const user = new User({
      fname: first_name,
      lname: last_name,
      email: email,
      password: password,
    });
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User saved successfully", userRegDetails: savedUser });
    console.log("User Registered");
  } catch (error) {
    console.log("Error creating User", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Failed to Register." });
    }
  }
});




// Endpoint to check if a user exists
const bcrypt = require("react-native-bcrypt");
app.get('/checkUser', async (req, res) => {
  const { email, password } = req.query;

  try {
    // Query the database for the user
    const user = await User.findOne({ email: email });

    if (user) {
      // User exists, now we need to check the password
      bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
          // Passwords match
          return res.json({ exists: true });
        } else {
          // Passwords don't match
          return res.json({ exists: false });
        }
      });
    } else {
      // User does not exist
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});