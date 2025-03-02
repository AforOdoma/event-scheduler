require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

app.get("/events", (req, res) => {
  res.json([{ id: 1, name: "AWS Webinar", date: "2024-07-10" }]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

