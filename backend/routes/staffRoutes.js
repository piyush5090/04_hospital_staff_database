const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff.js");
const multer = require("multer");
const verifyKey = require("../middlewares/verifyKey");
const { uploadToDrive } = require("../controllers/uploadController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * GET all staff
 */
router.get('/',verifyKey,  async (req, res) => {
  try {
    const allStaff = await Staff.find();
    res.json(allStaff);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});

router.post("/login", verifyKey, (req, res) => {
  try {
    res.status(200).json({ message: "Passkey verified" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});


/**
 * POST: Create new staff
 */
router.post("/", async (req, res) => {
  try {
    const { staffId } = req.body;

    const exists = await Staff.findOne({ staffId });
    if (exists) {
      return res.status(400).json({ error: "Staff ID already exists" });
    }

    const newStaff = new Staff(req.body);
    const saved = await newStaff.save();
    res.status(201).json({ message: "Staff created", staff: saved });
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH route
router.put("/:staffId", async (req, res) => {
  try {
    const updated = await Staff.findOneAndUpdate(
      { staffId: req.params.staffId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Staff not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE route
router.delete("/:staffId", async (req, res) => {
  try {
    const deleted = await Staff.findOneAndDelete({ staffId: req.params.staffId });
    if (!deleted) return res.status(404).json({ error: "Staff not found" });
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});


module.exports = router;
