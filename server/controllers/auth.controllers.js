const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin, User } = require("../models/index");

// ADMIN AUTH
// @desc: register a user
async function adminRegister(req, res) {
  try {
    // check if already one admin is present or not
    const admin = await Admin.countDocuments();

    if (admin)
      return res
        .status(400)
        .json({ msg: "There can be only one admin at max" });

    let { email, password, passwordCheck, name } = req.body;

    // validation
    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Please enter all the fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password should be at least 6 characters" });
    }

    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Please enter the same password twice" });
    }

    const existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        msg: "The email address is already in use by another account.",
      });
    }

    if (!name) name = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Admin({
      email,
      password: passwordHash,
      name,
      role: "admin",
      leaveRequests: [],
      bonusRequests: [],
      loanRequests: [],
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(`register - ${error.message}`);
    next(error);
  }
}

// @desc: login a user
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Please enter all the fields" });

    const user = await Admin.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid username or password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(`login - ${error.message}`);
    next(error);
  }
}

// @desc: verify a user against token
async function adminValidateToken(req, res) {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await Admin.findById(verified.id);
    if (!user) return res.json(false);

    return res.status(200).json(true);
  } catch (error) {
    console.log(`validateToken - ${error.message}`);
    next(error);
  }
}

// --------------------------------------------------------------------
// EMPLOYEE AUTH
// @desc: login a user
async function empLogin(req, res) {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Please enter all the fields" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid username or password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.log(`empLogin - ${error.message}`);
    next(error);
  }
}

// @desc: verify a user against token
async function empTokenIsValid(req, res) {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.status(200).json(true);
  } catch (error) {
    console.log(`empTokenIsValid - ${error.message}`);
    next(error);
  }
}

// @desc: change emp password
async function empChangePassword(req, res) {
  try {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const user = await User.findById(req.params.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ msg: "old password dont match with our database" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      password: passwordHash,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`empChangePassword - ${error.message}`);
    next(error);
  }
}

module.exports = {
  adminRegister,
  adminLogin,
  adminValidateToken,
  empLogin,
  empTokenIsValid,
  empChangePassword,
};
