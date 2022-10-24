const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    doctorInfo: {
      type: Object,
      required: true,
    },
    patientname: {
      type: String,
      required: true,
    },
    patientage: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    dateAndtime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    payment: {
      type: String,
      required: true,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);
module.exports = appointmentModel;
