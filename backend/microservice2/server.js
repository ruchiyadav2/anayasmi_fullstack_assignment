const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auditRoutes = require("./routes/auditRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/audit-log", auditRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/medical_audit_db")
    .then(() => console.log("Microservice2 DB Connected"))
    .catch(err => console.log(err));

app.listen(5002, () => {
    console.log("Microservice2 running on port 5002");
});
