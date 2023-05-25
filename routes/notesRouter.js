const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const Notes = require("../model/notesModel")
const Users = require("../model/usersModel")


// CREATE NOTE
router.post("/", asyncHandler(async(req, res)=>{
    
    const userId = req.body.userId

    const isUserExist = await Users.findOne({_id:userId})
    if(!isUserExist) res.status(400).send({msg : `user - ${userId} does not exist`})

    const note = {userId, ...req.body}
    const newNote = await Notes.create(note)

    res.status(200).json({ msg: `Note created`, newNote});
}))


// GET ALL NOTE ; SPECIFIC USER
router.get("/:userId", asyncHandler(async(req, res)=>{
    const userId = req.params.userId

    const isUserExist = await Users.findOne({_id:userId})
    const getUserNote = await Notes.find({ userId });

    if(!isUserExist) res.status(400).send({msg:"Invalid Request."})

    res.status(200).json({ msg: "User's Notes", getUserNote });

  
}))


// GET SINGLE NOTE ; SPEECIFIC USER
router.get( "/:userId/:noteId", asyncHandler(async (req, res) => {

    const userId = req.params.userId
    const noteId = req.params.noteId

    const getUserNote = await Notes.findOne({ _id: noteId });

    if (!getUserNote) res.status(400).send({ msg: "Invalid Request, Note not found." });

    else if(getUserNote && String(getUserNote.userId) === userId){
      res.status(200).json({ msg: "User Note", getUserNote });
  }

  else res.status(400).send({msg:"Bad request here"})

  })
);


// EDIT NOT - TITLE AND BODY
router.put("/:userId/note/:noteId", asyncHandler(async(req, res)=>{
    const userId = req.params.userId
    const noteId = req.params.noteId

    const isUserNoteExist = await Notes.findOne({ _id: noteId } && {userId});
    
    if(!isUserNoteExist) res.status(400).send({msg : `Invalid request.`})

    const updateNote = await Notes.findOneAndUpdate({_id:noteId},
        req.body,
        {
            new:true,
            timestamps : true,
            runValidators:true
        })

    if (!updateNote) res.status(400).send({ msg: "Invalid Request - Note not found." });
    res.status(200).json({msg:`Note ${noteId}, successfully updated.`, updateNote})
}))


// UPDATE NOTE PROPS - TIMESTAMPS SET TO FALSE
router.put(
  "/:userId/props/:noteId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    const isUserExist = await Users.findOne({ _id: userId });

    if (!isUserExist)
      res
        .status(400)
        .send({ msg: `Invalid request, user ${userId} does not exist.` });

    const updateNoteprops = await Notes.findOneAndUpdate({ _id: noteId }, req.body, {
      new: true,
      timestamps: false,
      runValidators: true,
    });

    if (!updateNoteprops)
      res.status(400).send({ msg: "Invalid Request - Note not found." });
    res
      .status(200)
      .json({ msg: `Details successfully updated - Note ${noteId}`, updateNote: updateNoteprops });
  })
);


// DELETE NOTE
router.delete('/:userId/notes/:noteId', asyncHandler(async(req, res)=>{
    const userId = req.params.userId
    const noteId = req.params.noteId

    const isUserExist = await Users.findOne({ _id: userId });
    
    if(!isUserExist) res.status(400).send({msg : `Invalid request, user ${userId} does not exist.`})

    const deleteNote = await Notes.findOneAndDelete({_id:noteId})

    if(!deleteNote) res.status(400).send({msg:`Note ${noteId}, does not exist.`})
    res.status(200).json({msg:`Note ${noteId} deleted successfully`, deleteNote})

}))


module.exports = router