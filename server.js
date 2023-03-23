const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const error = require("./middleWare/errorMiddleWareHandler");
const usersRouter = require("./routes/usersRouter");

// connecting to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DataBase connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

// middleWares
app.use(express.json());
app.use(error.errorMiddleWareHandler);
app.use("/api/users", usersRouter);

// creating server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
