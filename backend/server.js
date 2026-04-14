require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;
const DB_NAME = process.env.MONGO_DB_NAME || "wed";

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// 🔥 UPDATED SCHEMA
const contactSchema = new mongoose.Schema({
  names: String,
  email: String,
  weddingDate: String,
  cityVenue: String,
  phone: String,
  source: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model("Contact", contactSchema);

const isDbConnected = () => mongoose.connection.readyState === 1;

// 🔥 UPDATED API
app.post("/api/contact", async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: "Database is not connected" });
    }

    const {
      names,
      email,
      weddingDate,
      cityVenue,
      phone,
      source,
      message
    } = req.body;

    const newContact = new Contact({
      names,
      email,
      weddingDate,
      cityVenue,
      phone,
      source,
      message
    });

    await newContact.save();

    res.json({ message: "Saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error saving data",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: DB_NAME,
  })
  .then(() => {
    console.log(`MongoDB Connected (${DB_NAME})`);
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    console.error("API is running, but DB features may be unavailable.");
  });

app.get("/api/contact", (req, res) => {
  const token = req.headers.authorization;

  if (token !== "admin-token-123") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (!isDbConnected()) {
    return res.status(503).json({ message: "Database is not connected" });
  }

  Contact.find()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({
      message: "Error fetching contacts",
      error: err.message,
    }));
});
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "123456";

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: "admin-token-123"
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});