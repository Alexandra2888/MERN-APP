import Note from "../model/noteModel.js";

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createNote = async (req, res) => {
    try {
        const note = new Note({text: req.body.text});
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

export { getNotes, createNote };