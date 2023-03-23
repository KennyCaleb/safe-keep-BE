const express = require("express");
const router = express.Router();
const {registerUser, getUsers, getSingleUser, editUser, deleteUser} = require("../controllers/userControllers")

// register user
router.post("/add", registerUser);

//get all users
router.get("/fetch", getUsers)

//get single user
router.get("/fetch/:id", getSingleUser)

//edit user
router.put("/edit/:id", editUser);

//delete user
router.delete("/delete/:id", deleteUser);

module.exports = router;
