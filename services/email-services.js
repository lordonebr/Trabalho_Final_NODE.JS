
const nodemail = require('nodemailer');

const transporter = nodemail.createTransport({
    service: 'gmail',
    auth: {
        user: "trabalhofinalnode@gmail.com",
        pass: "TrabalhoFin@l2019"
    }
});

exports.send = async (to, subject, body) => {
    transporter.sendMail({
        from: 'trabalhofinalnode@gmail.com',
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