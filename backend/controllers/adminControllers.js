const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching users",
      success: false,
      error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching users",
      success: false,
      error,
    });
  }
};

// changeDoctorAccountStatus
// desc approve doctor account
// req post
const changeDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });
    console.log(doctor, "doctorffffffffff");
    const user = await User.findOne({ _id: doctor.userId });
    console.log(user, "usertttttttt");
    const unseenNotifications = user.unseenNotifications;
    console.log(
      user.unseenNotifications,
      "unseen notifications changestatus22222"
    );
    unseenNotifications.push({
      type: "new-doctor-request-changed",
      message: `your doctor account has been ${status}`,
      onClickPath: "/notifications",
    });
    user.isDoctor = status === "Approved" ? true : false;
    console.log(user.isDoctor);
    console.log(user.isDoctor, "isdoctor ??????");
    await user.save();
    console.log(user, "user after doctor:true");
    console.log(doctor, "doctor after doctor true");
    res.status(200).json({
      message: "Doctor status updated successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};

// post
// block/unblock user
const changeUserStatus = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.body.userid },
      { isBlock: req.body.status }
    );

    res.status(200).json({
      message: ` ${user.name} "your account is" ${req.body.status}`,
      success: true,
    });
  } catch (error) {
    console.log(error, "change user status catch");
    res.status(400).send({
      message: "user not found",
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllDoctors,
  getAllUsers,
  changeDoctorStatus,
  changeUserStatus,
};
