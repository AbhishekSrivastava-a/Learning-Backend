const User = require('../model/userModel');


exports.updateUserName = async (req, res) => {
    console.log("Error");
    const userId = req.query.id;
    const newName = req.body.newName;
    if (!newName) {
        return res.status(400).json({ error: 'New name is missing or invalid' });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.name = newName;
        await user.save();

        return res.status(200).json({ message: 'User name updated successfully', user });
    } catch (error) {
        console.error('Error updating user name:', error);
        return res.status(500).json({ error: 'Failed to update user name' });
    }
};