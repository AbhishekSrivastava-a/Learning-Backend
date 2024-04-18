const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    profileImage: {
        type: DataTypes.STRING
    },
    timezone: {
        type: DataTypes.STRING, 
        allowNull: false,
        defaultValue: 'UTC' 
    },
    ipAddress : {
        type: DataTypes.STRING
    }
});

module.exports = User;
