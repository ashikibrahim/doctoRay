const express = require('express')
const router = express.Router()
const {
  getAllDoctors,
  getAllUsers,
  changeDoctorStatus,
} = require('../controllers/adminControllers')
const {protect} = require('../middleware/authMiddleware')

router.get("/get-all-doctors",protect,getAllDoctors)
router.get("/get-all-users",protect,getAllUsers)
router.post("/change-doctor-account-status",protect,changeDoctorStatus)
  module.exports=router;