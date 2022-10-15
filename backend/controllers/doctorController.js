const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const doctorData = async(req,res)=>{
    try {
        const doctor=await Doctor.findOne({userId: req.body.userId})
        res.status(200).json({
            message: "Doctor info fetched successfully",
           success: true,
           data:doctor,
        })
    } catch (error) {
        res.status(500).send({ message:"invalid doctor",success:false,error}) 
    }
}


const updateDoctorInfo = async(req,res)=>{
    try {
       
        res.status(200).json({
            message: "Doctor info fetched successfully",
           success: true,
           data:doctor,
        })
    } catch (error) {
        res.status(500).send({ message:"invalid doctor",success:false,error}) 
    }
}

module.exports ={
    doctorData,
    updateDoctorInfo,
}