const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Image = sequelize.define('Image', {
    imageName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Image;
