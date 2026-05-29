require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const roadmapRoutes = require("./routes/roadmap");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));
const allowedOrigins = [
  "http://localhost:3000",
  "https://ai-career-roadmap-generator.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());

// Base Route Health check (Useful for Render deployment checks)
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "online", 
    service: "AI Career Roadmap Generator Backend API",
    version: "1.0.0",
    database: mongooseStateDescription()
  });
});

// API Routes
app.use("/api", roadmapRoutes);

// Helper to check Mongoose connection status text
function mongooseStateDescription() {
  const mongoose = require("mongoose");
  switch (mongoose.connection.readyState) {
    case 0: return "disconnected";
    case 1: return "connected";
    case 2: return "connecting";
    case 3: return "disconnecting";
    default: return "unknown";
  }
}

// Global 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Requested route does not exist." });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.stack);
  res.status(500).json({ 
    message: "An unexpected error occurred on the server.",
    error: process.env.NODE_ENV === "development" ? err.message : {}
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`Server listening on port ${PORT}`);
  console.log(`API Base Address: http://localhost:${PORT}/api`);
  console.log(`=========================================`);
});
