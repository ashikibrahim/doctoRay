const express = require('express')
const router = express.Router()
const {doctorData,
    updateDoctorInfo,
} = require('../controllers/doctorController')
const {protect} = require('../middleware/authMiddleware')
// const ameen = require ("../middleware/ameen")
const upload=require("../utils/multer")
// const upload=require("../utils/multer")

router.post("/doctor-info",protect,doctorData)
router.post("/update-doctor-info",protect,updateDoctorInfo)
// router.post("/update-doctor-info",protect,updateDoctorInfo)


module.exports=router;