const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Notes = require("../model/notesModel");
const Users = require("../model/usersModel");

// create note and its props - DEPRECATED !!!
router.post(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const isUserNoteCollectionExist = await Notes.findOne({ userId });
    if (isUserNoteCollectionExist) res.send("user Collection already exist");

    const isUserExist = await Users.findOne({ _id: userId });
    if (!isUserExist) res.send("user does not exist");

    const note = { userId, notes: [] };
    const addNote = await Notes.create(note);
    res.status(400).json({ msg: "Notes added successfully", addNote });
  })
);

// get specific user notes.
router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const getNotes = await Notes.findOne({ userId });

    if (!getNotes)
      res
        .status(400)
        .send({ msg: `Sorry no collection with such user Id - ${userId}` });

    const userAllNotes = getNotes.notes;
    res
      .status(400)
      .json({ msg: `All Notes for user Id - ${userId}`, userAllNotes });
  })
);

// post single note to array of subdocument
router.put(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const getNotes = await Notes.findOne({ userId });

    getNotes.notes.push(req.body);

    const updated = await getNotes.save();
    res.status(400).json(updated);
  })
);

// edit a note
router.put(
  "/:userId/notes/:noteId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    const getNotes = await Notes.findOne({ userId: userId });
    if (!getNotes) res.status(400).send({ msg: `Invalid user Id - ${userId}` });

    let noteIndex;
    getNotes.notes.filter((note, index) => {
      if (noteId === String(note._id)) {
        noteIndex = index;
      }
    });

    getNotes.notes[noteIndex].note = req.body;
    getNotes.notes[noteIndex].updatedAt = getNotes.notes[noteIndex].updatedAt;
    const updated = await getNotes.save({ timestamps: false });

    res.status(400).json({ msg: "Note Updated", updated });
  })
);

// edit note props
router.put(
  "/:userId/notes/props/:noteId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    const getNotes = await Notes.findOne({ userId });

    let noteIndex;
    getNotes.notes.filter((note, index) => {
      if (noteId === String(note._id)) {
        noteIndex = index;
      }
    });

    getNotes.notes[noteIndex].isArchived = req.body.isArchived;

    const updated = await getNotes.save({
      timestamps: { createdAt: false, updatedAt: false },
    });
    res.status(400).json({ msg: "Note props Updated ", updated });
  })
);

module.exports = router;
