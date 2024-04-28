const nodemailer = require("nodemailer");

// Create transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: "vineetagarwal.2020cs@technonjr.org",
    pass: "",
  },
});

// Export sendMail function
module.exports.sendMail = async (data) => {
  try {
    const { name, email, message } = data;
    const emailTemplate = `
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Date & Time:</strong> ${new Date()}</p>
    `;
    // Send mail with defined transport object
    await transporter.sendMail({
      from: `${email}`, // Sender address
      to: "vineetagarwal.2020cs@technonjr.org", // Receiver address
      subject: "Contact Form Submission", // Subject line
      html: emailTemplate, // HTML body
    });
    console.log("Message sent");
  } catch (error) {
    console.error(`nodeMailer - ${error.message}`);
    next(error);
  }
};
