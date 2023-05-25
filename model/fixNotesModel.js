const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    notes: [
      new Schema(
        {
          note: { title: String, body: String },
          isArchived: Boolean,
          isPinned: Boolean,
          cat: String,
          isBinned: Boolean,
        },
        { timestamps: true }
      ),
    ],
  },
  { timestamps: true }
);

const Notes = mongoose.model("notes", notesSchema);
module.exports = Notes;
