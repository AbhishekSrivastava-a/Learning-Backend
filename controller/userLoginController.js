const User = require('../model/userModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
    const  email = req.body.email;
    const  password  = req.body.password;
    const otp = req.body.otp;

    try {
        const foundUser = await User.findOne({ where: { email }, raw: true });
        if (!foundUser) {
            return res.status(401).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        if (foundUser.otp !== otp) {
            return res.status(401).json({ error: 'Incorrect OTP' });
        }
        const token = jwt.sign({ id: foundUser.id, email: foundUser.email }, '_key', { expiresIn: '1h' });
        return res.redirect('/homepage'); 
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Failed to login' });
    }
};