const mongoose = require("mongoose");
const doctorSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
    },
    specialization: {
      type: String,
    },
    experience: {
      type: String,
    },
    feePerConsultation: {
      type: Number,
    },
    timingsFrom: {
      type:String,
    },
    timingsTo: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    image:{
      type:String,

    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
