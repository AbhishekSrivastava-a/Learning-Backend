const moment = require('moment-timezone');
const User = require('../model/userModel');

exports.getUserById = async (req, res) => {
    const userId = req.query.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userInIST = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: moment.utc(user.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment.utc(user.updatedAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
        };

        return res.status(200).json(userInIST);
        
    } catch (error) {
        console.error('Error retrieving user by ID:', error);
        return res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

