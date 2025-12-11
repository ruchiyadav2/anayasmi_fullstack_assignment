const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date,default:Date.now() },
    endDate: { type: Date },
    budget: { type: Number },
    file: { type: String }, // uploaded file name
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Participant" }]
});

module.exports = mongoose.model("Program", programSchema);
