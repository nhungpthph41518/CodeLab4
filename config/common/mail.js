var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nhungpthph41518@fpt.edu.vn",
    pass: "ycos piiz yroe srxg",
  },
});
module.exports = transporter;
