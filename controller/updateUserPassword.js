const User = require('../model/userModel');
const bcrypt = require('bcrypt');

exports.updateUserPassword = async (req, res) => {
    const userId = req.query.id;
    const newPassword = req.body.newPassword;
    
    if (!newPassword) {
        return res.status(400).json({ error: 'New Password missing or Invalid' });
    }

    try {
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully', user });
    } catch (error) {
        console.error('Error updating user password:', error);
        return res.status(500).json({ error: 'Failed to update user password' });
    }
};
