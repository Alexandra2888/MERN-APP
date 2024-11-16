import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Note", noteSchema);