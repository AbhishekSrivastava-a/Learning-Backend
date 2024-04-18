const User = require('../model/userModel');
const { sendVerificationEmail, generateOTP } = require('../utils/emailVerification');
const {getTimezoneFromIPAddress } = require('../utils/timezoneHelper');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }
        
        const otp = generateOTP();
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            otp: otp.toString(),
            ipAddress: req.connection.remoteAddress
        });

        await sendVerificationEmail(email, otp);
        return res.status(200).json({ message: 'User registered successfully. Please check your email for verification.' });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ error: 'Failed to register user' });
    }
};
