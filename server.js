const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors")
const error = require("./middleWare/errorMiddleWareHandler");
const usersRouter = require("./routes/usersRouter");
const notesRouter = require("./routes/notesRouter");


// connecting to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DataBase connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

// middleWares
app.use(express.json());
app.use(error.errorMiddleWareHandler);
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);


// creating server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
