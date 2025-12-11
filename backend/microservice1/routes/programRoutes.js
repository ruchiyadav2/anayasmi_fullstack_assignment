const axios = require("axios");
const express = require("express");
const router = express.Router();
const Program = require("../models/program");
const Participant = require("../models/participant");
const multer = require("multer");

// File Upload configuration
const upload = multer({ dest: "uploads/" });

// CREATE a new program
router.post("/", upload.single("file"), async (req, res) => {
    try {
        const program = new Program({
            name: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            budget: req.body.budget,
            file: req.file ? req.file.filename : null
        });

        const savedProgram = await program.save();
        res.json(savedProgram);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all programs
router.get("/", async (req, res) => {
    try {
        const programs = await Program.find().populate("participants");
        res.json(programs);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ GET program by ID (this was missing)
router.get("/:id", async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);

        if (!program) {
            return res.status(404).json({ message: "Program not found" });
        }

        res.json(program);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// UPDATE a program
router.put("/:id", upload.single("file"), async (req, res) => {
    try {
        const updatedProgram = await Program.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                budget: req.body.budget,
                file: req.file ? req.file.filename : undefined
            },
            { new: true }
        );
        res.json(updatedProgram);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Program
router.delete("/:id", async (req, res) => {
  try {
    const programId = req.params.id;
    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Save audit log entry
    await axios.post("http://localhost:5002/audit-log", {
      programId: program._id,
      programName: program.name,
      description: program.description,
      startDate: program.startDate,
      endDate: program.endDate,
      budget: program.budget,
      file: program.file,
      action: "Deleted",
      user: "Admin"
    });

    await program.deleteOne();
    res.json({ message: "Program deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
