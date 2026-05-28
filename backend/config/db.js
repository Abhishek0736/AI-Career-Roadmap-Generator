const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.warn("WARNING: MONGODB_URI environment variable is missing. Running in database-free fallback mode.");
      return;
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of hanging
    });

    console.log(`SUCCESS: MongoDB Atlas connected to host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`DATABASE CONNECTION ERROR: ${error.message}`);
    console.warn("The server will continue running. All generated roadmaps will operate in-memory.");
  }
};

module.exports = connectDB;
