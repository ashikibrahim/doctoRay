const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getuserinfo,
  applyDoctorAccount,
  markSeenNotifications,
  deleteAllNotifications,
  unSeenNotifications,
  getApprovedDoctors,
  checkAvailable,
  bookAppointment,
  appointmentData,
  verifyPayment,                               
  checkout,
  userAppointments,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/multer");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-user-info-by-id", protect, getuserinfo);
router.post(
  "/apply-doctor-account",
  protect,
  upload.single("image"),
  applyDoctorAccount
);
router.post("/mark-all-notifications-as-seen", protect, markSeenNotifications);
router.post("/unseen-notifications", protect, unSeenNotifications);
router.post("/delete-all-notifications", protect, deleteAllNotifications);
router.get("/get-all-approved-doctors", getApprovedDoctors);
router.post("/check-booking-avilability", protect, checkAvailable);
router.post("/book-appointment", protect, bookAppointment);
router.post("/get-appointment-details-by-id", protect, appointmentData);
router.post("/checkout", checkout);
router.post("/verify", verifyPayment);
router.get("/get-appointments-by-user-id", protect, userAppointments);
module.exports = router;
