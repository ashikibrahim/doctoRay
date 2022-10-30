const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const cloudinary = require("../utils/cloudinary");
const { response } = require("express");
const moment = require("moment");
const Razorpay = require("razorpay");
const crypto = require("crypto");

//@desc Register new user
// @route POST /api/users
// @access Public
// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }
  console.log(req.body);
  try {
    // check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    // hash password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    //create user in db
    const newuser = new User(req.body);
    await newuser.save();
    return res
      .status(200)
      .send({ message: "user created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error creating user", success: false, error });
  }

  //check if user is created
});

const loginUser = async (req, res) => {
  //take email and password from body checks email first
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does not exist", success: false });
    }

    //if user email nexists compare password req.body.password(normal password) and user.password=encrypted pass.

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "password incorrect", Success: false });
    } else {
      if (user.isBlock === "unBlock") {
        // if password matches generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        res
          .status(200)
          // token passed  to frontend as data:
          .send({ message: "login successful", Success: true, data: token });
      } else {
        res
          .status(403)
          .send({ message: "your account has been blocked", Success: false });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error logging in", Success: false, error });
  }
};
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

//@desc get users
// @route POST /api/users/get-user-info-by-id
// @access Public
const getuserinfo = async (req, res) => {
  const userid = req.user._id;
  try {
    const user = await User.findOne({ _id: userid });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};

//Apply doctor account
//@desc Apply doctor form
// @route POST /api/users/apply-doctor-account
// @access Private
const applyDoctorAccount = async (req, res) => {
  console.log(req.body);
  //user id is taken from protect middleware
  const userid = req.user._id;
  console.log(req.user._id);
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const starttime = moment(req.body.start, ["HH:mm"]).format("hh:mm a");
    const endtime = moment(req.body.end, ["HH:mm"]).format("hh:mm a");

    console.log(result);
    const newdoctor = new Doctor({
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
    });

    await newdoctor.save();
    console.log(newdoctor, "new doctor save");
    const adminUser = await User.findOne({ isAdmin: true });
    // explanation  vd22 creates new entry takes fromdata and spreads to
    // new doctor fn and save to Doctor schema and finds admin from User schema
    // pushes type,message,name,doctorId to unseen notification of admin user.

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for doctor account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctorlist",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    console.log(unseenNotifications, "app doc unseenZZZZZZZZZZZZZZZ");

    res.status(200).json({
      newdoctor,
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};

//markSeenNotifications
//post mark-all-notifications-as-seen
const markSeenNotifications = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    //user.unseenNotifications empty array
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    console.log(updatedUser, "updateduser.....");
    res.status(200).json({
      success: true,
      message: "All notifications marked as seen",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Error mark all as seen",
      success: false,
      error,
    });
  }
};

// getAllNotificatons
// post method
const unSeenNotifications = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    // const unseenNotifications = user.unseenNotifications;
    res.status(200).send({
      success: true,
      message: "your notifications",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error unseenotifications",
      success: false,
      error,
    });
  }
};

// deleteAllNotificatons
// post method
const deleteAllNotifications = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];

    const updatedUser = await user.save();
    updatedUser.password = undefined;
    console.log(updatedUser, "updateduser.....");
    res.status(200).json({
      success: true,
      message: "all notifications cleared",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error delete all seen",
      success: false,
      error,
    });
  }
};

//@desc get users
// @route POST /api/users/get-user-info-by-id
// @access Public
const getApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "Approved" });
    res.status(200).send({
      message: "doctor fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    return res.status(401).send({
      message: "error in fetching",
      success: false,
    });
  }
};

// check available time
// post
const checkAvailable = async (req, res) => {
  try {
    console.log(req.body.dateAndtime, "ppppppppppppppppppppppp");
    const timeAnddate = moment(req.body.dateAndtime).format("llll");
    console.log(timeAnddate, "qqqqqqqqqqqqqqqqqqq");

    const doctorId = req.body.doctorId;

    const appointment = await Appointment.find({
      doctorId: doctorId,
      dateAndtime: timeAnddate,
    });
    console.log(appointment, "33333333333333333333333333333");
    if (appointment.length > 0) {
      return res
        .status(200)
        .send({ message: "Appointments not available", success: false });
    } else {
      return res
        .status(200)
        .send({ message: "Appointments avaialable", success: true });
    }
  } catch (error) {
    return res.status(401).send({
      message: "error in check available",
      success: false,
    });
  }
};

// check available time
// post
const bookAppointment = async (req, res) => {
  console.log(req.body, "llllllllllllllllllllllllllllllllllllllll");
  console.log(req.body.doctorInfo, "pppppppppppppppppppppppppppppp");
  try {
    req.body.dateAndtime = moment(req.body.dateAndtime).format("llll");

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.name}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
      data: newAppointment,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error booking appointment", success: false });
  }
};

const appointmentData = async (req, res) => {
  try {
    const appointmentData = await Appointment.findOne({
      _id: req.body.appointmentId,
    });

    res.status(200).send({
      message: " data fetched successfully",
      success: true,
      data: appointmentData,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "dont get appointment id", success: false, error });
  }
};

const verifyPayment = async (req, res) => {
  console.log(req.body, "lllllllllllllllllllllllll");
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

const checkout = async (req, res) => {
  console.log(req.body);
  try {
    const appointmentData = await Appointment.findByIdAndUpdate(
      {
        _id: req.body.appointmentId,
      },
      {
        payment: "online",
      }
    );

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_ID,
      key_secret: process.env.RAZORPAY_KEY,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ message: "Something Went Wrong!" });
      }
      res.status(200).send({ data: order });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
    console.log(error);
  }
};

const userAppointments = async (req, res) => {
  console.log(req.user._id,"oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
  try {
    const appointments = await Appointment.find({ userId: req.user._id});
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
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
};

// login and signup
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("please add all fields");
//   }
//   //check if user exists
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     console.log("user already exists");
//     throw new Error("user already exists");
//   }
//   // hash password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   //create user
//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       message: "user suceess 111",
//       token: generateToken(user._id),
//     });
//     console.log(user.id,"register response user.id");
//     console.log( generateToken(user._id),"register response generatetoken (user._id)");
//   } else {
//     res.status(400);
//     throw new Error("invalid userdata");
//   }
// });

//@desc Authenticate a user
// @route POST /api/users/login
// @access Public
// const loginUser = async (req, res) => {
//   //take email and password from body checks email first
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res
//         .status(200)
//         .send({ message: "user does not exist", success: false });
//     }

//     //if user email nexists compare password req.body.password(normal password) and user.password=encrypted pass.

//     const isMatch = await bcrypt.compare(req.body.password, user.password);
//     if (!isMatch) {
//       return res
//         .status(200)
//         .send({ message: "password incorrect", Success: false });
//     } else {
//       // if password matches generate token
//       const token = jwt.sign({ id:user._id}, process.env.JWT_SECRET, {
//         expiresIn: "1d",
//       });
//       res
//         .status(200)
//         // token passed  to frontend as data:
//         .send({ message: "login successful", Success: true, data: token });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .send({ message: "error logging in", Success: false, error });
//   }
// };

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   // Check for user email
//   const user = await User.findOne({ email });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     console.log(user.unseenNotifications,"login unseennotiooooooooooooooooooo");
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       unseenNotifications: user.unseenNotifications,
//       seenNotifications: user.seenNotifications,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid credentials");
//   }
// });

// // @desc    Get user data
// // @route   GET /api/users/me
// // @access  Private
// const getMe = asyncHandler(async (req, res) => {
//   res.status(200).json(req.user);
// });

//Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };
