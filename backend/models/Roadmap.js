const mongoose = require("mongoose");

const phaseSchema = new mongoose.Schema({
  phaseNumber: { type: Number, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String },
  topics: { type: [String], required: true },
  project: {
    title: { type: String, required: true },
    description: { type: String }
  }
});

const roadmapSchema = new mongoose.Schema({
  role: { 
    type: String, 
    required: [true, "Career role target is required"],
    trim: true
  },
  skills: { 
    type: [String], 
    required: [true, "Current skills list is required"] 
  },
  experienceLevel: { 
    type: String, 
    required: true, 
    enum: ["Beginner", "Intermediate", "Advanced"] 
  },
  generatedRoadmap: {
    phases: [phaseSchema]
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Roadmap", roadmapSchema);
