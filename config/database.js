const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_registration', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});



module.exports = sequelize;