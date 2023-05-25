const express = require("express");
const router = express.Router();
const {registerUser,loginUser, getUsers, getSingleUser, editUser, deleteUser} = require("../controllers/userControllers")

// register user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

//get all users
router.get("/", getUsers)

//get single user
router.get("/:id", getSingleUser)

//edit user
router.put("/:id", editUser);

//delete user
router.delete("/:id", deleteUser);

module.exports = router;
