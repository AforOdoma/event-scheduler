require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // Add this for PostgreSQL

const app = express();
app.use(express.json());

// Define CORS options
const corsOptions = {
  origin: ["http://event-scheduler-frontend.s3-website-us-east-1.amazonaws.com", "https://event-scheduler-frontend.s3-website-us-east-1.amazonaws.com"],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
};

app.use(cors(corsOptions));

app.get('/api/data', (req, res) => {
    res.json({ message: "CORS is now configured!" });
  });

// Set up PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST || "terraform-20250302135207794100000002.casoqrd1myvc.us-east-1.rds.amazonaws.com",
  user: process.env.DB_USER || "eventadmin",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "postgres", // Default database name
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

// Initialize database tables if they don't exist
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
initializeDatabase();

// Root Route
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// Get All Events
app.get("/events", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Create a New Event
app.post("/events", async (req, res) => {
  const { name, date, email } = req.body;
  
  console.log("Received event data:", { name, date, email });

  // Basic validation
  if (!name || !date || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const result = await pool.query(
      'INSERT INTO events (name, date, email) VALUES ($1, $2, $3) RETURNING *',
      [name, date, email]
    );
    
    const newEvent = result.rows[0];
    res.status(201).json({ message: "Event created successfully!", event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: "Error creating event in database" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));