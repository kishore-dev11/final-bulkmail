import { useState } from "react";
import axios from "axios";

function App() {

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emails, setEmails] = useState("");

  const sendMail = async () => {

    try {

      const res = await axios.post("https://final-bulkmail.onrender.com/send", {
        subject,
        message,
        emails: emails.split(",")
      });

      alert(res.data.message);

      setSubject("");
      setMessage("");
      setEmails("");

    } catch (err) {
      alert("Mail Sending Failed");
      console.log(err);
    }

  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="w-[450px] bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Bulk Mail App
        </h1>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          rows="5"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          rows="4"
          placeholder="abc@gmail.com, xyz@gmail.com"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={sendMail}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Send Bulk Mail
        </button>

      </div>

    </div>

  );

}

export default App;