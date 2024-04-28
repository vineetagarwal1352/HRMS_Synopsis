const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const user = require("../controllers/user.controllers");
let auth = require("../controllers/auth.controllers");

const authMiddleware = async (req, res, next) => {
  try {
    console.log("authMiddleware => ");
    let token =
      req.query.token ||
      req.headers["x-access-token"] ||
      (req.headers.authorization &&
        req.headers.authorization.split("Bearer ")[1]);

    if (token === undefined)
      throw new Error("User token not found. Auth failed.");

    token = token.replace(/ /g, "+");
    req.body.accessToken = token;
    token = jwt.verify(token, process.env.JWT_SECRET);

    if (!token)
      return res
        .status(401)
        .json({ msg: "token verification failed, authorization denied" });

    const user = await User.findOne({ _id: token._id });
    if (!user) throw new Error("No such user found.");

    req.user = verified.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({
  storage: storage,
});

// User Auth controllers
userRouter.post("/login", auth.empLogin);
userRouter.post("/tokenIsValid", auth.empTokenIsValid);
userRouter.put("/changePassword/:id", auth.empChangePassword);

// User controllers
userRouter.get("/", authMiddleware, user.getEmp);
userRouter.post("/updateProfile", user.updateProfile);
userRouter.put("/applyLeave", authMiddleware, user.applyLeave);
userRouter.put("/bonusRequest", authMiddleware, user.bonusRequest);
userRouter.put("/loanRequest", user.loanRequest);
userRouter.get("/getSingleReqDetails/:userId/:reqId", user.getSingleReqDetails);
userRouter.get("/getNews", user.getNews);
userRouter.get("/getAlerts/:id", user.getAlerts);
userRouter.put("/deleteAlert", user.deleteAlert);
userRouter.post("/uploadfile", upload.single("file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please uplad a file");
    error.httpStatusCode = 400;
    return next();
  }
  console.log(file);
  res.send(file);
});
userRouter.post("/download/:attachmentName", function (req, res) {
  const attachmentName = req.params.attachmentName;
  console.log(attachmentName);

  var filePath = `public/${attachmentName}`;
  var fileName = `attachmentName`;

  res.download(filePath, fileName);
});

module.exports = userRouter;
