const express = require("express");
const router = express.Router();
const {
  generateRoadmap,
  getRoadmaps,
  deleteRoadmap
} = require("../controllers/roadmapController");

// Post generation route
router.post("/roadmap/generate", generateRoadmap);

// Get history list route
router.get("/roadmaps", getRoadmaps);

// Delete a specific roadmap route
router.delete("/roadmap/:id", deleteRoadmap);

module.exports = router;
