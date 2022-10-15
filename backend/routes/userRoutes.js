const express = require('express')
const router = express.Router()
const {registerUser,
    loginUser,
    getuserinfo,
    applyDoctorAccount,
    markSeenNotifications,
    deleteAllNotifications,
    unSeenNotifications,
    getApprovedDoctors,
    } = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const upload=require("../utils/multer")
// const authMiddleware = require("../middlewares/authMiddleware");

router.post ('/register',registerUser)
router.post ('/login',loginUser)
router.get('/get-user-info-by-id',protect,getuserinfo)
router.post('/apply-doctor-account',protect,upload.single('image'),applyDoctorAccount)
router.post('/mark-all-notifications-as-seen',protect,markSeenNotifications)
router.post('/unseen-notifications',protect,unSeenNotifications)
router.post('/delete-all-notifications',protect,deleteAllNotifications)
router.get('/get-all-approved-doctors',getApprovedDoctors)
module.exports = router