var nodemailer = require('nodemailer');
const templateMail = require('../template');

const sendMailNodejs = async (req, res) => {
  const user = req.session.user;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pipclupnomad@gmail.com',
      pass: 'xaxt yiti kpxt qgtu',
    },
  });

  var mailOptions = {
    from: 'pipclupnomad@gmail.com',
    to: user.email,
    subject: "thank you for ordering",
    content: "have a good day",
    html: templateMail(subject, content)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      req.session.message = {
        type: 'error',
        message: 'some thing error, check your mail again'
      }
      res.redirect('/user/order');
    } else {
      req.session.message = {
        type: 'success',
        message: 'send mail successfully'
      }
      res.redirect('/user/order');
    }
  })
}

module.exports = {
  sendMailNodejs
}
