const nodemail = require('nodemailer');
const configMail = require('../configs/mail');

const transporter = nodemail.createTransport({
    service: configMail.service,
    auth: {
        user: configMail.user,
        pass: configMail.pass,
    }
});

exports.send = async (to, subject, body) => {
    transporter.sendMail({
        from: configMail.user,
        to: to,
        subject: subject,
        html: body
    }, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};