require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); 
app.use(cors());

const events = []; // Temporary in-memory storage for events

// Root Route
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// Get All Events
app.get("/events", (req, res) => {
  res.json(events);
});

// Create a New Event (POST /events)
app.post("/events", (req, res) => {
  const { name, date, email } = req.body;

  // Basic validation
  if (!name || !date || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newEvent = {
    id: events.length + 1,
    name,
    date,
    email,
  };

  events.push(newEvent);
  res.status(201).json({ message: "Event created successfully!", event: newEvent });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
