const asyncHandler = require("express-async-handler");
const Users = require("../model/usersModel");

// register user
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const isUserNameTaken = await Users.findOne({ userName });
    const isEmailExist = await Users.findOne({ email: email });

    if (userName === "" || email === "" || password === "") {
      return res.send({ msg: "Fields cannot be empty" });
    } else if (isUserNameTaken) {
      return res.send({ msg: "Username already taken" });
    } else if (isEmailExist) {
      return res.send({ msg: "Email already taken" });
    } else if (password.length <= 4) {
      return res.send({ msg: "Password length should be greater than 4" });
    }

    const addUser = await Users.create(req.body);
    res.status(200).json({ msg: "user created successfully", addUser });
  } catch (error) {
    console.log(error);
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { userName, password } = req.body;
    const login = await Users.findOne({ userName });

    if (userName === "" || password === "") {
      return res.status(400).send({ msg: "Fields cannot be empty" });
    }

    else if(!login || (password !== login.password)){
      res.send({ msg: "invalid credentail"});
    }
    res.status(200).json({ msg: "Successfully Logged in", user:{userName:login.userName, email:login.email, userId:login._id}});
  } catch (error) {
    console.log(error);
  }
});

// get all registered users
const getUsers = asyncHandler(async (req, res) => {
  const allUsers = await Users.find();
  res.status(200).json(allUsers);
});

// get single user
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isUserExist = await Users.findOne({ _id: id });
  if (!isUserExist) {
    return res.status(400).send({ msg: "User does not exist" });
  }
  res.status(400).json(isUserExist);
});

// edit user
const editUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isUserExist = await Users.findOne({ _id: id });
  if (!isUserExist) {
    return res.status(400).send({ msg: "User does not exist" });
  }
  const updateUser = await Users.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ msg: "User Updated Successfully", updateUser });
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isUserExist = await Users.findOne({ _id: id });
  if (!isUserExist) {
    return res.status(400).send({ msg: "User does not exist" });
  }
  const deleteUser = await Users.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "User Deleted permanently", deleteUser });
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getSingleUser,
  editUser,
  deleteUser,
};
