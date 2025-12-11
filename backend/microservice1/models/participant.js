const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
    name: { type: String, required: true },
    age: { type: Number },
    enrolledDate: { type: Date,default:Date.now() }
});

module.exports = mongoose.model("Participant", participantSchema);
