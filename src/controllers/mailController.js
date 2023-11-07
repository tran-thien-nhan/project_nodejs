var nodemailer = require('nodemailer');
const templateMail = require('../template');

const sendMailNodejs = async (req, res) => {
    const { email, subject, content } = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pipclupnomad@gmail.com',
            pass: 'xaxt yiti kpxt qgtu',
        },
    });

    var mailOptions = {
        from: 'pipclupnomad@gmail.com',
        to:email,
        subject: subject,
        html: templateMail(subject, content)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.redirect('/email');
        } else {
            res.redirect('/email');
        }
    })
}

module.exports = {
    sendMailNodejs
}
