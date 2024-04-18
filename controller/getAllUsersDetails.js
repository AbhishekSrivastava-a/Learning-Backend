const moment_timezone = require('moment-timezone');
const User = require('../model/userModel');
const { getTimezoneFromIPAddress } = require('../utils/timezoneHelper');

exports.getAllUsers = async (req, res) => {
    try {
        const ipHeader = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log("ipHeader", ipHeader);
        if (!ipHeader) {
            return res.status(400).json({ error: 'IP address not provided' });
        }
        const ipAddress = ipHeader.split(',')[0].trim();
        const userTimeZone = await getTimezoneFromIPAddress(ipAddress);
        if (!userTimeZone) {
            throw new Error('Unable to determine the timezone from IP address');
        }
        const users = await User.findAll();
        const usersInUserTimezone = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: moment_timezone(user.createdAt).tz(userTimeZone).format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment_timezone(user.updatedAt).tz(userTimeZone).format('YYYY-MM-DD HH:mm:ss')
        }));
        return res.status(200).json(usersInUserTimezone);
    } catch (error) {
        console.error('Error retrieving all users:', error);
        return res.status(500).json({ error: 'Failed to retrieve users' });
    }
};
