import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err.message);
  });

// Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Send Mail API
app.post("/send", async (req, res) => {
  try {
    const { subject, message, emails } = req.body;

    if (!subject || !message || !emails || emails.length === 0) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: emails.join(","), // Send to multiple recipients
      subject: subject,
      text: message,
    });

    res.status(200).json({
      success: true,
      message: "Mail Sent Successfully",
    });

  } catch (err) {
    console.log("Mail Error:", err);

    res.status(500).json({
      success: false,
      message: "Mail Sending Failed",
      error: err.message,
    });
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("Bulk Mail API is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});