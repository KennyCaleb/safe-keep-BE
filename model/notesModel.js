const mongoose = require("mongoose")
const Schema = mongoose.Schema

const noteSchema = new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  note: { title: String, body: String },
  props : {isArchived : Boolean, isPinned : Boolean, cat :[String], isBinned : Boolean}
}, {timestamps:true});

const Notes = mongoose.model("notes", noteSchema)
module.exports = Notes