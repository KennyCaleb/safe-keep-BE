const mongoose = require("mongoose");

// creating new schema
const usersSchema = new mongoose.Schema(
  {
    userName: String,
    email: {
        type : String,
        unique : true
    },
    password: {
        type : String, 
        minlength : 4
    }
  },
  { timestamps: true }
);

const Users = mongoose.model("users", usersSchema)
module.exports = Users