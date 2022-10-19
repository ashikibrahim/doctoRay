const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("../utils/cloudinary");
const moment = require("moment");

const doctorData = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.status(200).json({
      message: "Doctor info fetched successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({ message: "invalid doctor", success: false, error });
  }
};

const updateDoctorInfo = async(req, res) => {
    console.log(req.body,"888888888888888889999999998888");
  try {
    console.log(req.body,"mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
    // const result = await cloudinary.uploader.upload(req.file.path);
    const starttime = moment(req.body.start, ["HH:mm"]).format("hh:mm a");
    const endtime = moment(req.body.end, ["HH:mm"]).format("hh:mm a");
    const userid=req.user._id;
      console.log(userid,"wwwwwwwwwwwwwwwwwwwwwwwwwww");
    // const doctor = await Doctor.findOne({userId:req.body.userId})
    // console.log(doctor,"update doct 999999999999999999");
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      { userId:userid},
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        specialization: req.body.specialization,
        experience: req.body.experience,
        feePerConsultation: req.body.feePerConsultation,
        image: result.url,
        start: starttime,
        end: endtime,
        userId: userid,
      }
    );
    res.status(200).json({
      message: "doctor info updated successfully",
      success: true,
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).send({ message: "invalid doctor", success: false, error });
    // console.log(error,"error updating ....55555555555555555555555555555");
  }
};

const getDoctorById = async (req, res) => {
  console.log(req.body.doctorId ,"body.docid00000000000000000000");
  try {
    const doctor = await Doctor.findOne({_id: req.body.doctorId });
    console.log(doctor,"huuuuuuuuuuusjsuuuuuuuuuuuu");
    res.status(200).json({
      message: "doctor info fetched successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({ message: "invalid doctor", success: false, error });
  }
};


module.exports = {
  doctorData,
  updateDoctorInfo,
  getDoctorById,
};
