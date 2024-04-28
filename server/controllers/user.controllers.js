let { Admin, User } = require("../models/index");
const axios = require("axios").default;
require("dotenv").config();

// @desc: get user details of logged in user
async function getEmp(req, res) {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({ user });
  } catch (error) {
    console.log(`getEmp - ${error.message}`);
    next(error);
  }
}

// @update user profile
async function updateProfile(req, res) {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.user.name,
        address: req.body.user.address,
        email: req.body.user.email,
        gender: req.body.user.gender,
        phoneNo: req.body.user.phoneNo,
        salary: req.body.user.salary,
        team: req.body.user.team,
        role: req.body.user.role,
        skills: req.body.user.skills,
        doj: req.body.user.doj,
        objective: req.body.user.objective,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(`updateProfile - ${error.message}`);
    next(error);
  }
}

// @desc: Apply for leave
async function applyLeave(req, res) {
  try {
    const admin = await Admin.find({});

    let leaveRequests = admin[0].leaveRequests;
    leaveRequests.push(req.body.request);

    const adminReq = await Admin.findOneAndUpdate(
      { email: admin[0].email },
      { leaveRequests: leaveRequests }
    );

    const user = await User.findOne({ email: req.body.request.empEmail });
    let notification = user.notification;
    notification.push(req.body.request);

    const userReq = User.findOneAndUpdate(
      { email: req.body.request.empEmail },
      { notification: notification }
    );

    res.status(200).json(userReq);
  } catch (error) {
    console.log(`applyLeave - ${error.message}`);
    next(error);
  }
}

// @desc: request for bonus
async function bonusRequest(req, res) {
  try {
    const admin = await Admin.find({});

    let bonusRequests = admin[0].bonusRequests;
    bonusRequests.push(req.body.request);

    const adminReq = await Admin.findOneAndUpdate(
      { email: admin[0].email },
      { bonusRequests: bonusRequests }
    );

    const user = await User.findOne({ email: req.body.request.empEmail });
    let notification = user.notification;
    notification.push(req.body.request);

    const userReq = User.findOneAndUpdate(
      { email: req.body.request.empEmail },
      { notification: notification }
    );

    res.status(200).json(userReq);
  } catch (error) {
    console.log(`bonusRequest - ${error.message}`);
    next(error);
  }
}

// @desc: request for loan
async function loanRequest(req, res) {
  try {
    const admin = await Admin.find({});

    let loanRequests = admin[0].loanRequests;
    loanRequests.push(req.body.request);

    const adminReq = await Admin.findOneAndUpdate(
      { email: admin[0].email },
      { loanRequests: loanRequests }
    );

    const user = await User.findOne({ email: req.body.request.empEmail });
    let notification = user.notification;
    notification.push(req.body.request);

    const userReq = await User.findOneAndUpdate(
      { email: req.body.request.empEmail },
      { notification: notification }
    );
    res.status(200).json(userReq);
  } catch (error) {
    console.log(`loanRequest - ${error.message}`);
    next(error);
  }
}

// @desc: get particular req details from USER.notification model
async function getSingleReqDetails(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    const reqDetails = user.notification.filter(
      (request) => request.reqId === req.params.reqId
    );
    res.status(200).json(reqDetails);
  } catch (error) {
    console.log(`getSingleReqDetails - ${error.message}`);
    next(error);
  }
}

// @desc: get news from news api
async function getNews(req, res) {
  const api_key = process.env.REACT_APP_NEWS_API;
  try {
    const news = await axios.get(
      `https://gnews.io/api/v4/search?q=technology&country=in&language=en&max=10&apikey=${api_key}`
    );
    res.status(200).json(news);
  } catch (error) {
    console.log(`getNews - ${error.message}`);
    next(error);
  }
}

// @desc: get alerts if any
async function getAlerts(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.alert);
  } catch (error) {
    console.log(`getAlerts - ${error.message}`);
    next(error);
  }
}

// @desc: delete a particular alert
async function deleteAlert(req, res) {
  try {
    const user = await User.findById(req.body.id);
    let alert = user.alert;
    alert = alert.filter((item) => item.reqId !== req.body.reqId);

    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      {
        alert,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`deleteAlert - ${error.message}`);
    next(error);
  }
}

module.exports = {
  deleteAlert,
  getAlerts,
  getNews,
  getSingleReqDetails,
  loanRequest,
  bonusRequest,
  applyLeave,
  updateProfile,
  getEmp,
};
