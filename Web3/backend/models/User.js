const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    middlename: { type: String },
    lastname: { type: String },
    email: { type: String },
    gender: { type: String },
    phone: { type: String },
    password: { type: String },
    dob: { type: String },
    role: { type: String },
    userAddress: { type: String },
    voted:{type:Boolean}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
