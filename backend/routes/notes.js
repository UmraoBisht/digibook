const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');


//Route 1: Get all Notes Using 'get': api/notes/fetchAllNotes login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error! Sorry for inconvenience!");
    }
})

//Route 2 : Add New Note Using 'post': api/notes/addnote login required
router.post('/addnote', fetchuser,
    [
        // set validation requires 'express-validator'
        body('title', "Title Should be Atleast 3 character").isLength({ min: 3 }),
        body('description', "Description should atleast 5 character").isLength({ min: 5 }),
        body('tag', "An Optional Field"),
    ]
    , async (req, res) => {

        try {
            // ****************if there is any error return bad request********************************
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ Errors: errors.array() })
            }
            // create New Note
            let note = await Notes.create(
                {
                    title: req.body.title,
                    description: req.body.description,
                    tag: req.body.tag,
                    user: req.user.id
                }
            )
            res.json(note);

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error! Sorry for inconvenience!");
        }
    })

//Route 3: Update existing Note Using 'put': api/notes/updatenote login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {

        // update new note
        const { title, description, tag } = req.body;
        // create new note Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and then update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // authenticating user id
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }
        // updating note here by id 
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error! Sorry for inconvenience!");
    }
}
)


//Route 3: Delete existing Note Using 'delete': api/notes/deletenote login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note to be updated and then update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // authenticating user id
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }
        // deleting note here by id 
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json("Note Successfully Deleted!");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error! Sorry for inconvenience!");
    }
})

module.exports = router;