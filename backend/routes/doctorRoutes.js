const express = require("express");
const router = express.Router();
const {
  doctorData,
  updateDoctorInfo,
  getDoctorById,
  getAppointments,
} = require("../controllers/doctorController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/multer");
// const upload=require("../utils/multer")

router.post("/doctor-info", protect, doctorData);
router.post("/update-doctor-info", protect, updateDoctorInfo);
router.post("/get-doctor-info-by-id", protect, getDoctorById);
router.get("/get-doctor-appoitments", protect, getAppointments);

module.exports = router;
