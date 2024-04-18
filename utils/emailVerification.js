const nodemailer = require('nodemailer');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'sofia.kilback@ethereal.email',
                pass: '74qZfcfpwuK2mBwx5e'
            }
        });

        const info = await transporter.sendMail({
            from: 'emailsent@email.com',
            to: email,
            subject: 'Account Verification OTP',
            html: `<p>Your account verification OTP is: <strong>${otp}</strong></p>`
        });

        console.log('Verification email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

module.exports = { sendVerificationEmail, generateOTP };
