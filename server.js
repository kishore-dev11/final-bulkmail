import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 📧 Gmail SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

// 📤 Send Bulk Email API
app.post("/send", async (req, res) => {
    const { subject, body, emails } = req.body;

    if (!emails || emails.length === 0) {
        return res.status(400).json({ message: "No emails found" });
    }

    try {
        for (let email of emails) {
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: subject,
                text: body,
            });
        }

        res.json({ message: "All emails sent successfully ✅" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Email sending failed ❌" });
    }
});

app.listen(process.env.PORT, () => {
    console.log("Server running on port 5000 🚀");
});