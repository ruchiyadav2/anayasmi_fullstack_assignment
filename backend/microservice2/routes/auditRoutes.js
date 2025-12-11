const express = require("express");
const router = express.Router();
const AuditLog = require("../models/auditlog"); // use lowercase exactly

// CREATE a deleted program entry (called from microservice1)
router.post("/", async (req, res) => {
  try {
    const log = new AuditLog({
      programId: req.body.programId,
      programName: req.body.programName,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      budget: req.body.budget,
      file: req.body.file,
      action: req.body.action,
      user: req.body.user,
      deletedAt: Date.now()
    });

    await log.save();
    res.json({ message: "Audit Log saved", log });

  } catch (error) {
    console.error("AUDIT LOG ERROR:", error);   // 🔥 PRINT ACTUAL ERROR
    res.status(500).json({
      message: "Error saving audit log",
      error: error.message,                     // 🔥 SEND REAL MESSAGE
      stack: error.stack                        // (optional)
    });
  }
});



// GET all audit logs
router.get("/", async (req, res) => {
    try {
        const logs = await AuditLog.find().sort({ deletedAt: -1 });
        res.json(logs);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
