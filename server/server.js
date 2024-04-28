const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const rateLimiter = require("express-rate-limit");
require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./models/index");
const { sendMail } = require("./utils/mailer");
const PORT = process.env.PORT || 5000;

// ---------------MONGO DB SETUP---------------
function mongoConnect() {
  try {
    mongoose.connect(process.env.ATLAS_URI);
    const db = mongoose.connection;
    db.on("error", (error) => {
     throw new Error(error.message);
    });

    db.on("disconnected", () => {
      console.log("MongoDB => disconnected !!");
    });

    db.once("open", () => {
      console.log("MongoDB => connected !!");
    });
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    next(error);
  }
}

function errorHandler(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
}

// connect to mongoDB client
mongoConnect();
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json({ type: "application/json" }));
app.use(
  rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 20,
    handler: function (req, res) {
      res.status(429).json({
        success: false,
        message: "Requests limit exceeded. Please wait a while then try again",
      });
    },
  })
);
app.use(errorHandler);

const usersRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");

app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/email/contact", async (req, res) => {
  try {
    const mailerResp = await sendMail(req.body);
    res.send("Message sent successfully");
  } catch (error) {
    next(error);
  }
});

// serve static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
