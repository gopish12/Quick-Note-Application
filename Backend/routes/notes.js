const express = require("express");//including express library to use its functionalities
const fetchuser = require("../middleware/fetchUser");//using fetchuser to validate the token.
const router = express.Router();//to route as per the url..
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { route } = require("./auth");


// ROUTE1: Get all the notes of the logged in user
// api/notes/fetchAllNotes
// being logged in is necessary
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        return res.json(notes);
    }
    catch (error) {
        return res.status(500).json({"error":"Some Error Occured"});
    }
})



// ROUTE2:Adding a new note using POST request
// api/notes/addNote
// being logged in is necessary

router.post('/addNote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    //Check for errors
    try {
        //fetching all the fields which user has entered in the body
        const { title, description, tag } = req.body;

        //checking if any error exists based on the validation 
        const errors = validationResult(req);
        //when error is present show error
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = await new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({"message":"Some error occured"});
    }
})

// ROUTE:3: Updating an existing note of a user
// api/notes/updateNote/:id
// Must be logged in to update a note

router.put('/updateNote/:id', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    //fetching these fields from body
    const { title, description, tag } = req.body;
    try {
        // Create a New Note object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(401).send("Unauthorised");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorised");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})
// ROUTE:4: Deleting an existing note of a user
// api/notes/deleteNote/:id
// Must be logged in to update a note

router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(401).send("Note not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorised");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.send({ "Success": "Your note has been deleted", "note": note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})
module.exports = router;