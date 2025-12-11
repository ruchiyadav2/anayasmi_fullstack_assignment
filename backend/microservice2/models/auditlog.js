const mongoose = require("mongoose");

const auditlogSchema = new mongoose.Schema({
    programId: { type: String, required: true },
    programName: { type: String,required:true },    // Add program name
    user: { type: String },           // Add user who performed action
    action: { type: String },         // Add action performed (e.g., 'deleted', 'updated')
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    budget: { type: Number },
    file: { type: String },           // Add file name if any
    deletedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("auditlog", auditlogSchema);
