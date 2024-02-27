const mongoose = require("mongoose");

const userRegDetailsSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Users",
  }
);

const User = mongoose.model("Users", userRegDetailsSchema);
module.exports = User;
