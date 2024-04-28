const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  name: { type: String },
  gender: { type: String },
  address: { type: String },
  phoneNo: { type: String },
  role: { type: String },
  team: { type: String },
  objective: { type: String },
  skills: { type: String },
  doj: { type: String },
  notification: [],
  alert: [],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
