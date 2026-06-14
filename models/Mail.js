import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    subject: String,
    message: String,
    emails: [String],
    status: String,
});

export default mongoose.model("Mail", mailSchema);