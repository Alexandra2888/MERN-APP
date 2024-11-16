import express from "express";
const router = express.Router();
import { getNotes, createNote } from "../controller/noteController.js";

router.get("/", getNotes);
router.post("/", createNote);

export default router;