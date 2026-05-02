require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;
const DB_NAME = process.env.MONGO_DB_NAME || "wed";
const ADMIN_TOKEN = "admin-token-123";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const contactSchema = new mongoose.Schema({
  userId: String,
  userEmail: String,
  userFullName: String,
  names: String,
  email: String,
  weddingDate: String,
  cityVenue: String,
  phone: String,
  source: String,
  message: String,
  status: { type: String, default: "New Inquiry" },
  demoLink: { type: String, default: "Pending From Admin" },
  adminMessage: { type: String, default: "We will contact you soon" },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

const isDbConnected = () => mongoose.connection.readyState === 1;

const checkDbConnection = (res) => {
  if (!isDbConnected()) {
    res.status(503).json({ message: "Database is not connected" });
    return false;
  }

  return true;
};

const isAdminAuthorized = (req) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  return token === ADMIN_TOKEN;
};

const requireAdminAuth = (req, res, next) => {
  if (!isAdminAuthorized(req)) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};

app.post("/api/contact", async (req, res) => {
  try {
    if (!checkDbConnection(res)) {
      return;
    }

    const {
      userId,
      userEmail,
      userFullName,
      names,
      email,
      weddingDate,
      cityVenue,
      phone,
      source,
      message,
    } = req.body;

    const newContact = new Contact({
      userId,
      userEmail,
      userFullName,
      names,
      email,
      weddingDate,
      cityVenue,
      phone,
      source,
      message,
    });

    await newContact.save();

    res.status(201).json({
      message: "Saved successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    res.status(500).json({
      message: "Error saving data",
      error: error.message,
    });
  }
});

app.get("/api/contact", requireAdminAuth, async (req, res) => {
  try {
    if (!checkDbConnection(res)) {
      return;
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("GET /api/contact error:", error);
    res.status(500).json({
      message: "Error fetching contacts",
      error: error.message,
    });
  }
});

app.get("/api/contact/user/:userId", async (req, res) => {
  try {
    if (!checkDbConnection(res)) {
      return;
    }

    const { userId } = req.params;

    const latestConsultation = await Contact.findOne({ userId }).sort({
      createdAt: -1,
    });

    if (!latestConsultation) {
      return res.status(404).json({
        message: "No consultation found for this user",
      });
    }

    res.json(latestConsultation);
  } catch (error) {
    console.error("GET /api/contact/user/:userId error:", error);
    res.status(500).json({
      message: "Error fetching user consultation",
      error: error.message,
    });
  }
});

app.put("/api/contact/:id", requireAdminAuth, async (req, res) => {
  try {
    if (!checkDbConnection(res)) {
      return;
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const { status, demoLink, adminMessage } = req.body;
    const updatePayload = {};

    if (typeof status !== "undefined") {
      updatePayload.status = status;
    }

    if (typeof demoLink !== "undefined") {
      updatePayload.demoLink = demoLink;
    }

    if (typeof adminMessage !== "undefined") {
      updatePayload.adminMessage = adminMessage;
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      message: "Contact updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("PUT /api/contact/:id error:", error);
    res.status(500).json({
      message: "Error updating contact",
      error: error.message,
    });
  }
});

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "123456";

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: "admin-token-123",
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME || DB_NAME,
  })
  .then(() => {
    console.log(`MongoDB Connected (${DB_NAME})`);
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    console.error("API is running, but DB features may be unavailable.");
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});