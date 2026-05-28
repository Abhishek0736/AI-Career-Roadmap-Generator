const Roadmap = require("../models/Roadmap");
const { generateDynamicRoadmap } = require("../utils/roadmapGenerator");
const mongoose = require("mongoose");

// POST /api/roadmap/generate
exports.generateRoadmap = async (req, res) => {
  try {
    let { role, skills, experienceLevel } = req.body;

    // Sanitize skills parameter (support comma-separated string or fallback to array)
    if (typeof skills === "string") {
      skills = skills.split(",").map(s => s.trim()).filter(s => s.length > 0);
    } else if (!Array.isArray(skills)) {
      skills = [];
    }

    // Simple validation
    if (!role || skills.length === 0 || !experienceLevel) {
      return res.status(400).json({ 
        message: "Missing required inputs: role, skills list, and experienceLevel are required." 
      });
    }

    if (!["Beginner", "Intermediate", "Advanced"].includes(experienceLevel)) {
      return res.status(400).json({ 
        message: "Experience level must be either Beginner, Intermediate, or Advanced." 
      });
    }

    // Generate the roadmap phases dynamically using the helper utility
    const generatedRoadmap = generateDynamicRoadmap(role, skills, experienceLevel);

    const roadmapData = {
      role,
      skills,
      experienceLevel,
      generatedRoadmap,
      createdAt: new Date()
    };

    // Check if database is connected before saving
    if (mongoose.connection.readyState === 1) {
      const newRoadmap = new Roadmap(roadmapData);
      const savedRoadmap = await newRoadmap.save();
      return res.status(201).json(savedRoadmap);
    } else {
      // Graceful fallback for local development before database is set up
      console.warn("MongoDB is not connected. Returning unsaved in-memory generated roadmap.");
      
      // Inject a temporary ID so the frontend has a valid key/identifier
      const unsavedRoadmap = {
        _id: `temp_id_${Date.now()}`,
        ...roadmapData
      };
      return res.status(201).json(unsavedRoadmap);
    }

  } catch (error) {
    console.error("Error in generateRoadmap controller:", error);
    return res.status(500).json({ 
      message: "An internal server error occurred while generating the roadmap.",
      error: error.message 
    });
  }
};

// GET /api/roadmaps
exports.getRoadmaps = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.warn("MongoDB is not connected. Returning empty archive.");
      return res.status(200).json([]);
    }

    const roadmaps = await Roadmap.find().sort({ createdAt: -1 });
    return res.status(200).json(roadmaps);
  } catch (error) {
    console.error("Error in getRoadmaps controller:", error);
    return res.status(500).json({ 
      message: "Failed to retrieve roadmaps archive.",
      error: error.message 
    });
  }
};

// DELETE /api/roadmap/:id
exports.deleteRoadmap = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Roadmap ID is required." });
    }

    // Handle mock IDs gracefully
    if (id.startsWith("temp_id_")) {
      return res.status(200).json({ 
        message: "In-memory roadmap deleted successfully (MongoDB was offline)." 
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: "Database connection unavailable. Cannot perform delete operation." 
      });
    }

    const deleted = await Roadmap.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Roadmap not found in database." });
    }

    return res.status(200).json({ message: "Roadmap deleted successfully." });
  } catch (error) {
    console.error("Error in deleteRoadmap controller:", error);
    return res.status(500).json({ 
      message: "Failed to delete the roadmap.",
      error: error.message 
    });
  }
};
